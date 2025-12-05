import Router from "express";
import sampleController from "../controllers/sample.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.post("/", auth.jwtAuthMiddleware, sampleController.createSample);
router.get("/organization/:orgId", auth.jwtAuthMiddleware, sampleController.listSampleByOrg);
router.get("/:id", auth.jwtAuthMiddleware, sampleController.getSampleById);
router.put("/:id", auth.jwtAuthMiddleware, sampleController.updateSample);
router.delete("/:id", auth.jwtAuthMiddleware, sampleController.deleteSample);

export default router;
