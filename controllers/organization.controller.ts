import { Request, Response } from "express";
import Organization from "../models/organization.model.ts";
import organizationRepository from "../repositories/organization.repositer.ts";

function getOrganizations(req: Request, res: Response) {
  const orgs = organizationRepository.getOrganizations();
  res.status(200).json(orgs);
}

function getOrganization(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const org = organizationRepository.getOrganizationById(id);
  if (org) {
    res.status(200).json(org);
  } else {
    res.status(404).json({ error: "Organization not found" });
  }
}

function createOrganization(req: Request, res: Response) {
  const { name, localization, cnpj, latitude, longitude } = req.body;
  const org = organizationRepository.createOrganization(
    name,
    localization,
    cnpj,
    latitude,
    longitude
  );
  res.status(201).json(org);
}

function updateOrganization(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const org = organizationRepository.updateOrganizationById(
    req.params.name,
    req.params.localization,
    req.params.cnpj,
    parseFloat(req.params.latitude),
    parseFloat(req.params.longitude),
    id
  );
  if (org) {
    res.status(200).json(org);
  } else {
    res.status(404).json({ error: "Organization not found" });
  }
}

function deleteOrganization(req: Request, res: Response) {
  const id = parseInt(req.params.id);
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
