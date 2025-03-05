import { Router } from "express";
import apiRouter from "./api/api.router.js";
import viewsRouter from "./views.router.js";
import productsManager from "../data/fs/products.en.js";

// Creation of the router
const router = Router();

// Middleware for all routes
router.use("/", viewsRouter);
router.use("/api", apiRouter);


// Routes for products
const listProducts = async (req, res) => {
  try {
    const allProducts = await productsManager.read();
    if (allProducts.length > 0) {
      return res.status(200).json({ response: allProducts });
    }
    return res.status(404).json({ error: "No products found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting products" });
  }
};

// Endpoint for getting all products
router.get("/api/products", listProducts);

export default router;
