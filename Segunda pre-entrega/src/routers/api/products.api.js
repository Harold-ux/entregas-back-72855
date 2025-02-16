import { Router } from "express";
import { createProduct, readProducts, readOne, updateProduct, deleteProduct } from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsRouter = Router();

productsRouter.get("/", readProducts);
productsRouter.post("/", isValidProduct, createProduct);
productsRouter.get("/:pid", readOne);
productsRouter.put("/:pid", isValidProduct, updateProduct);
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
