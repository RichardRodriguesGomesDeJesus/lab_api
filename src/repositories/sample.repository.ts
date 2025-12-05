import Sample from "../models/sample.model";
import { localization } from "../utils/types";

const samples: Sample[] = [];

function getSamples(): Sample[] {
  return samples;
}

function getSampleById(id: string): Sample | undefined {
  return samples.find((s) => s.sampleId === id);
}

function createSample(
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
  sample.sampleId = (samples.length + 1).toString();

  samples.push(sample);
  return sample;
}

function updateSampleById(
  description: string,
  collectionDate: string,
  organizationId: string,
  localization: localization,
  sampleId: string
) {
  const index = samples.findIndex((s) => s.sampleId === sampleId);

  if (index === -1) {
    return null;
  }

  samples[index].description = description;
  samples[index].collectionDate = collectionDate;
  samples[index].organizationId = organizationId;
  samples[index].localization = localization;

  return samples[index];
}

function deleteSampleById(id: string): boolean {
  const index = samples.findIndex((s) => s.sampleId === id);

  if (index === -1) {
    return false;
  }

  samples.splice(index, 1);
  return true;
}

export default {
  getSamples,
  getSampleById,
  createSample,
  updateSampleById,
  deleteSampleById,
};
