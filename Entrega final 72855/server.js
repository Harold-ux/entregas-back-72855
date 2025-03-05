import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import morgan from "morgan";
import path from "path";
import { Server } from "socket.io";
import productsManager from "./src/data/mongo/managers/products.mongo.js";
import connectToMongo from "./src/helpers/mongo.helper.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import viewsRouter from "./src/routers/views.router.js";
import { rootDir } from "./utils.js";

// Connect to MongoDB
console.log(process.env.MONGO_URL);
connectToMongo();

// Server configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8080; // Fallback to 8080 if process.env.PORT is undefined

// WebSocket
io.on("connection", async (socket) => {
  try {
    console.log("New user connected");
    // Emit the list of products to the newly connected client
    socket.emit("updateProducts", await productsManager.read());

    // Event to add a product
    socket.on("addProduct", async (productData) => {
      if (!productData.photo) {
        productData.photo =
          "https://static.thenounproject.com/png/1247947-200.png"; // Default image
      }
      await productsManager.create(productData);
      // Update the list of products to all connected clients
      io.emit("updateProducts", await productsManager.read());
    });

    // Event to delete a product
    socket.on("deleteProduct", async (productId) => {
      try {
        const deleted = await productsManager.destroyById(productId);
        if (!deleted) {
          console.log(`Product with ID ${productId} not found`);
          return;
        }
        // Update the list of products to all connected clients
        io.emit("updateProducts", await productsManager.read());
      } catch (error) {
        console.error("Error deleting the product:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  } catch (error) {
    console.error("Error connecting WebSocket:", error);
    socket.emit("error", "Could not load products.");
  }
});

// Handlebars template engine configuration
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(rootDir, "src", "views", "layouts"),
  })
);
app.set("view engine", "handlebars");
console.log("Root directory:", rootDir);
app.set("views", path.join(rootDir, "src", "views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", viewsRouter);
app.use("/", router);
app.use(errorHandler);
app.use(pathHandler);

// Start server
server.listen(port, () => console.log(`Server running on port ${port}`));
