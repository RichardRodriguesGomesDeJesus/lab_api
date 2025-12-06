import Router from "express";
import sampleController from "../controllers/sample.controller.ts";
import auth from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/", auth.jwtAuthMiddleware, sampleController.createSample);
router.get(
  "/organization/:orgId",
  auth.jwtAuthMiddleware,
  sampleController.getSamples
);
router.get("/:id", auth.jwtAuthMiddleware, sampleController.getSample);
router.put("/:id", auth.jwtAuthMiddleware, sampleController.updateSample);
router.delete("/:id", auth.jwtAuthMiddleware, sampleController.deleteSample);

export default router;
