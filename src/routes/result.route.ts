import express from "express";
import resultsController from "../controllers/results.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", auth.jwtAuthMiddleware, resultsController.getResults);
router.get("/:id", auth.jwtAuthMiddleware, resultsController.getResult);
router.post("/", auth.jwtAuthMiddleware, resultsController.createResult);
router.put("/:id", auth.jwtAuthMiddleware, resultsController.updateResult);
router.delete("/:id", auth.jwtAuthMiddleware, resultsController.deleteResult);

export default router;