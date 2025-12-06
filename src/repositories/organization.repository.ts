import Organization from "../models/organization.model.ts";
import { AppDataSource } from "../datasource.ts";
import { localization } from "../utils/types.ts";
import Results from "../models/resultados.model.ts";

const repository = AppDataSource.getRepository(Organization);

async function getOrganizations(): Promise<Organization[]> {
  const orgs = await repository.find();
  return orgs;
}

async function getOrganizationById(id: string): Promise<Organization | null> {
  return await repository.findOneBy({ organizationId: id });
}

async function getResultByOrganizationId(id: string): Promise<Results | null> {
  const results = await AppDataSource.getRepository(Results).findOneBy({
    sampleId: id,
  });

  if (!results) {
    return null;
  }

  return results;
}
async function createOrganization(
  name: string,
  localization: localization,
  cnpj: string,
  latitude: number,
  longitude: number
): Promise<Organization> {
  const org = new Organization(name, localization, latitude, longitude, cnpj);
  return await repository.save(org);
}

async function updateOrganizationById(
  name: string,
  localization: localization,
  cnpj: string,
  latitude: number,
  longitude: number,
  organizationId: string
): Promise<Organization | null> {
  const org = await repository.findOneBy({ organizationId });
  if (!org) {
    return null;
  }
  org.name = name;
  org.localization = localization;
  org.cnpj = cnpj;
  return await repository.save(org);
}

async function deleteOrganizationById(id: string): Promise<boolean> {
  const org = await repository.findOneBy({ organizationId: id });

  if (org) {
    return false;
  }
  try {
    await repository.delete(id);
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  getOrganizations,
  getOrganizationById,
  getResultByOrganizationId,
  createOrganization,
  updateOrganizationById,
  deleteOrganizationById,
};
