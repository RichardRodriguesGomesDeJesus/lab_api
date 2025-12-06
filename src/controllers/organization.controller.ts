import { Request, Response } from "express";
import Organization from "../models/organization.model.ts";

import organizationRepository from "../repositories/organization.repository.ts";

async function getOrganizations(req: Request, res: Response) {
  const orgs = await organizationRepository.getOrganizations();
  res.status(200).json(orgs);
}

async function getOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const org = await organizationRepository.getOrganizationById(id);
  if (org) {
    res.status(200).json(org);
  } else {
    res.status(404).json({
      mensagem: "Organization not found",
    });
  }
}
async function getResultsByOrganizationId(req: Request, res: Response) {
  const id = req.params.id;
  const results = await organizationRepository.getResultByOrganizationId(id);
  if (results) {
    res.status(200).json(results);
  }
}

async function createOrganization(req: Request, res: Response) {
  const { name, localization, cnpj, latitude, longitude } = req.body;
  const org = await organizationRepository.createOrganization(
    name,
    localization,
    cnpj,
    parseFloat(latitude),
    parseFloat(longitude)
  );
  res.status(201).json(org);
}

async function updateOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const { name, localization, cnpj, latitude, longitude } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Organization ID is required" });
  }
  const org = await organizationRepository.updateOrganizationById(
    name,
    localization,
    cnpj,
    parseFloat(latitude),
    parseFloat(longitude),
    id
  );
  if (org) {
    res.status(200).json(org);
  } else {
    res.status(404).json({ error: "Organization not found" });
  }
}

async function deleteOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await organizationRepository.deleteOrganizationById(id);
  if (deleted) {
    res.status(200);
  } else {
    res.status(404);
  }
}

export default {
  getOrganizations,
  getOrganization,
  getResultsByOrganizationId,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
