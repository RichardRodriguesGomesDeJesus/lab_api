import express from "express";
import organizationController from "../controllers/organization.controller.ts";

const router = express.Router();

router.get("/", organizationController.getOrganizations);
router.get("/:id", organizationController.getOrganization);
router.post("/", organizationController.createOrganization);
router.put("/:id", organizationController.updateOrganization);
router.delete("/:id", organizationController.deleteOrganization);

export default router;
