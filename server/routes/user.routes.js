import { Router } from "express";

import UserController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/users", UserController.getUsers);
userRoutes.get("/users/:id", UserController.getUser);
userRoutes.put("/users/:id", UserController.updateUser);
userRoutes.delete("/users/:id", UserController.deleteUser);

userRoutes.post("/auth/login", UserController.authUser);
userRoutes.post("/auth/register", UserController.createUser);
userRoutes.get("/auth/session", UserController.verifyUserSession);
userRoutes.post("/auth/logout", UserController.logoutUser);
userRoutes.post("/auth/recovery", UserController.recoveryUser);
userRoutes.post("/auth/reset-password/:token", UserController.resetPasswordUser);

export default userRoutes;
