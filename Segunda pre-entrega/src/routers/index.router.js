import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views.router.js";
import productsManager from "../data/fs/products.en.js";

// Creación del router
const router = Router();

// Middleware que conecta otras rutas desde `index.api.js`
router.use("/", viewsRouter);
router.use("/api", apiRouter);


// Ruta para obtener la lista de productos
const listProducts = async (req, res) => {
  try {
    const allProducts = await productsManager.readAll();
    if (allProducts.length > 0) {
      return res.status(200).json({ response: allProducts });
    }
    return res.status(404).json({ error: "No products found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting products" });
  }
};

// Endpoint para obtener todos los productos
router.get("/api/products", listProducts);

// Ruta de bienvenida con parámetros de consulta (Query Params)
router.get("/api/welcome", (req, res) => {
  const { name, age } = req.query;
  const message = `Hola ${name || "Coder"}! Tienes ${age || 18} años!`;
  return res.status(200).send(message);
});

// Exportación del router para su uso en el servidor principal
export default router;
