import express from "express";
import organizationController from "../controllers/organization.controller.ts";
import auth from "../middlewares/auth.middleware.ts"

const router = express.Router();

router.get("/", auth.jwtAuthMiddleware, organizationController.getOrganizations);
router.get("/:id", auth.jwtAuthMiddleware, organizationController.getOrganization);
router.post("/", auth.jwtAuthMiddleware, organizationController.createOrganization);
router.put("/:id", auth.jwtAuthMiddleware, organizationController.updateOrganization);
router.delete("/:id", auth.jwtAuthMiddleware, organizationController.deleteOrganization);

export default router;
