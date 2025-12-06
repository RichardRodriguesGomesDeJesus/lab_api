import { Request, Response } from "express";
import Organization from "../models/organization.model.ts";
import organizationRepository from "../repositories/organization.repository.ts";

function getOrganizations(req: Request, res: Response) {
  const orgs = organizationRepository.getOrganizations();
  res.status(200).json(orgs);
}

function getOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const org = organizationRepository.getOrganizationById(id);
  if (org) {
    res.status(200).json(org);
  } else {
    res.status(404).json({
      mensagem: "Organization not found",
    });
  }
}

function createOrganization(req: Request, res: Response) {
  const { name, localization, cnpj, latitude, longitude } = req.body;
  const org = organizationRepository.createOrganization(
    name,
    localization,
    cnpj,
    parseFloat(latitude),
    parseFloat(longitude)
  );
  res.status(201).json(org);
}

function updateOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const { name, localization, cnpj, latitude, longitude } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Organization ID is required" });
  }
  const org = organizationRepository.updateOrganizationById(
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

function deleteOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = organizationRepository.deleteOrganizationById(id);
  if (deleted) {
    res.status(200).json({ message: "Organization deleted" });
  } else {
    res.status(404).json({ error: "Organization not found" });
  }
}

export default {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
