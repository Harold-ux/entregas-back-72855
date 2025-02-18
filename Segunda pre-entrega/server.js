import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { __dirname, rootDir } from "./src/utils/utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import viewsRouter from "./src/routers/views.router.js";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import productsManager from "./src/data/fs/products.en.js";

// Server configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8080;

// WebSocket
io.on("connection", async (socket) => {
  try {
    console.log("New user connected");
    // Emit the list of products to the newly connected client
    socket.emit("updateProducts", await productsManager.readAll());

    // Event to add a product
    socket.on("addProduct", async (productData) => {
      if (!productData.image) {
        productData.image =
          "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"; // Default image
      }
      await productsManager.create(productData);
      // Update the list of products to all connected clients
      io.emit("updateProducts", await productsManager.readAll());
    });

    // Event to delete a product
    socket.on("deleteProduct", async (productId) => {
      try {
        const deleted = await productsManager.deleteOne(productId);
        if (!deleted) {
          console.log(`Product with ID ${productId} not found`);
          return;
        }
        // Update the list of products to all connected clients
        io.emit("updateProducts", await productsManager.readAll());
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
server.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
