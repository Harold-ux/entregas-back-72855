import { Router } from "express";
import { create, read, readById, updateById, deleteById, paginate } from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.post("/", isValidProduct, create);
productsRouter.get("/pages", paginate);
productsRouter.get("/:pid", readById);
productsRouter.put("/:pid", isValidProduct, updateById);
productsRouter.delete("/:pid", deleteById);

export default productsRouter;
