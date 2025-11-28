import express from "express";
import userController from "../controllers/user.controller.ts";
import auth from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.get("/", auth.jwtAuthMiddleware, userController.getUsers);
router.get("/:id", auth.jwtAuthMiddleware, userController.getUser);
router.post("/", auth.jwtAuthMiddleware, userController.createUser);
router.put("/:id", auth.jwtAuthMiddleware, userController.updateUser);
router.delete("/:id", auth.jwtAuthMiddleware, userController.deleteUser);

export default router;
