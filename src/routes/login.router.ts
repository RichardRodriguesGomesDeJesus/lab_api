import express from "express";
import authController from "../controllers/auth.controller.ts";

const router = express.Router();

router.post("/", authController.login);

export default router;
