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

// Configuración del servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8080;

// WebSocket
io.on("connection", async (socket) => {
  try {
    console.log("Nuevo usuario conectado");
    // Emitir la lista de productos al cliente recién conectado
    socket.emit("updateProducts", await productsManager.readAll());

    // Evento para agregar un producto
    socket.on("addProduct", async (productData) => {
      if (!productData.image) {
        productData.image =
          "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"; // Imagen por defecto
      }
      await productsManager.create(productData);
      // Actualizar la lista de productos a todos los clientes conectados
      io.emit("updateProducts", await productsManager.readAll());
    });

    // Evento para eliminar un producto
    socket.on("deleteProduct", async (productId) => {
      try {
        const deleted = await productsManager.deleteOne(productId);
        if (!deleted) {
          console.log(`Producto con ID ${productId} no encontrado`);
          return;
        }
        // Actualizar la lista de productos a todos los clientes conectados
        io.emit("updateProducts", await productsManager.readAll());
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });

  } catch (error) {
    console.error("Error al conectar WebSocket:", error);
    socket.emit("error", "No se pudieron cargar los productos.");
  }
});

// Configuración del motor de plantillas Handlebars
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

// Rutas
app.use("/", viewsRouter);
app.use("/", router);
app.use(errorHandler);
app.use(pathHandler);

// Iniciar servidor
server.listen(port, () =>
  console.log(`Servidor corriendo en el puerto ${port}`)
);
