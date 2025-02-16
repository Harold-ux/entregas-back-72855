import { Router } from "express";
import { createCartMock, createCart, readOneCart, readCarts, addProductToCart } from "../../controllers/carts.controller.js";


const cartsRouter = Router();

cartsRouter.post("/api/carts", createCartMock);
cartsRouter.post("/api/carts", createCart);
cartsRouter.get("/api/carts/:cid", readOneCart);
cartsRouter.get("/api/carts", readCarts);
cartsRouter.post("/api/carts/:cid/product/:pid", addProductToCart);

export default cartsRouter;
