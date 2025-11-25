import Organization from "../models/organization.model.ts";
import { localization } from "../utils/types.ts";

const orgs: Organization[] = [];

function getOrganizations(): Organization[] {
  return orgs;
}

function getOrganizationById(id: string): Organization | undefined {
  return orgs.find((org) => org.organizationId === id);
}

function createOrganization(
  name: string,
  localization: localization,
  cnpj: string,
  latitude: number,
  longitude: number
) {
  const org = new Organization(name, localization, latitude, longitude, cnpj);
  orgs.push(org);
  return org;
}

function updateOrganizationById(
  name: string,
  localization: localization,
  cnpj: string,
  latitude: number,
  longitude: number,
  organizationId: string
) {
  const orgIndex = orgs.findIndex(
    (org) => org.organizationId === organizationId
  );
  if (!orgIndex) {
    return null;
  }
  orgs[orgIndex].name = name;
  orgs[orgIndex].localization = localization;
  orgs[orgIndex].cnpj = cnpj;
  return orgs[orgIndex];
}

function deleteOrganizationById(id: string): boolean {
  const orgIndex = orgs.findIndex((org) => org.organizationId === id);

  if (orgIndex === -1) {
    return false;
  }
  orgs.splice(orgIndex, 1);
  return true;
}

export default {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganizationById,
  deleteOrganizationById,
};
