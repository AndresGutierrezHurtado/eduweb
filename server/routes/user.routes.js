import { Router } from "express";

import UserController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/users", UserController.getUsers);
userRoutes.get("/users/:id", UserController.getUser);

userRoutes.post("/auth/login", UserController.authUser);
userRoutes.post("/auth/register", UserController.createUser);
userRoutes.get("/auth/session", UserController.verifyUserSession);
userRoutes.post("/auth/logout", UserController.logoutUser);

export default userRoutes;
