import { AppDataSource } from "../datasource.ts";
import Sample from "../models/sample.model.ts";
import { localization } from "../utils/types.ts";

const repository = AppDataSource.getRepository(Sample);

async function getSamples(): Promise<Sample[]> {
  return await repository.find();
}

async function getSampleById(id: string): Promise<Sample | null> {
  const sample = await repository.findOneBy({ sampleId: id });
  return sample;
}

async function createSample(
  description: string,
  collectionDate: string,
  organizationId: string,
  localization: localization
) {
  const sample = new Sample(
    description,
    collectionDate,
    organizationId,
    localization
  );

  // Gera um ID simples (mock)
  const res = await repository.save(sample);
  return res;
}

async function updateSampleById(
  description: string,
  collectionDate: string,
  organizationId: string,
  localization: localization,
  sampleId: string
) {
  const sample = await repository.findOneBy({ sampleId: sampleId });

  if (!sample) {
    return null;
  }

  sample.description = description;
  sample.collectionDate = collectionDate;
  sample.organizationId = organizationId;
  sample.localization = localization;

  const newSample = await repository.save(sample);

  return newSample;
}

async function deleteSampleById(id: string): Promise<boolean> {
  const sample = await repository.findOneBy({ sampleId: id });

  if (!sample) {
    return false;
  }
  repository.delete(sample);
  return true;
}

export default {
  getSamples,
  getSampleById,
  createSample,
  updateSampleById,
  deleteSampleById,
};
