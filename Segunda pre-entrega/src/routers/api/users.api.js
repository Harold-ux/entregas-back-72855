import { Router } from "express";
import { createUser, readOneUser, readUsers, updateUser, deleteUser } from "../../controllers/users.controller.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
isValidUser

const usersRouter = Router();

usersRouter.post("/", isValidUser, createUser);
usersRouter.get("/:uid", readOneUser);
usersRouter.get("/", readUsers);
usersRouter.put("/:uid", isValidUser, updateUser);
usersRouter.delete("/:uid", deleteUser);

export default usersRouter;
// Exportación del router para su uso en `index.api.js`
