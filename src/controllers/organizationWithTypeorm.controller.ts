import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Organization } from "../../models/organization.model";

const organizationRepository = AppDataSource.getRepository(Organization);

export async function getOrganizations(req: Request, res: Response) {
  const orgs = await organizationRepository.find();
  return res.status(200).json(orgs);
}

export async function getOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const org = await organizationRepository.findOneBy({ id });

  if (!org) {
    return res.status(404).json({ message: "Organization not found" });
  }
  return res.status(200).json(org);
}

export async function createOrganization(req: Request, res: Response) {
  const { name, localization, cnpj, latitude, longitude } = req.body;

  const org = organizationRepository.create({
    name,
    localization,
    cnpj,
    latitude,
    longitude,
  });

  await organizationRepository.save(org);
  return res.status(201).json(org);
}

export async function updateOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const org = await organizationRepository.findOneBy({ id });

  if (!org) {
    return res.status(404).json({ message: "Organization not found" });
  }

  organizationRepository.merge(org, req.body);
  await organizationRepository.save(org);

  return res.status(200).json(org);
}

export async function deleteOrganization(req: Request, res: Response) {
  const id = req.params.id;
  const result = await organizationRepository.delete(id);

  if (result.affected === 0) {
    return res.status(404).json({ message: "Organization not found" });
  }

  return res.status(200).json({ message: "Organization deleted" });
}

export default {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};