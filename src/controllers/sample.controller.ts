import { Request, Response } from "express";
import sampleRepository from "../repositories/sample.repository.ts";

export async function getSamples(req: Request, res: Response) {
  const samples = await sampleRepository.getSamples();
  return res.status(200).json(samples);
}

export async function getSample(req: Request, res: Response) {
  const id = req.params.id;
  const sample = await sampleRepository.getSampleById(id);

  if (!sample) {
    return res.status(404).json({ message: "Sample not found" });
  }
  return res.status(200).json(sample);
}

export async function createSample(req: Request, res: Response) {
  const { description, collectionDate, organizationId, localization } =
    req.body;

  const sample = await sampleRepository.createSample(
    description,
    collectionDate,
    organizationId,
    localization
  );

  return res.status(201).json(sample);
}

export async function updateSample(req: Request, res: Response) {
  const id = req.params.id;
  const { collectionDate, description, organizationId, localization } =
    req.body;
  const sample = await sampleRepository.updateSampleById(
    id,
    collectionDate,
    description,
    organizationId,
    localization
  );

  if (!sample) {
    return res.status(404).json({ message: "Sample not found" });
  }

  return res.status(200).json(sample);
}

export async function deleteSample(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await sampleRepository.deleteSampleById(id);

  if (!deleted) {
    return res.status(404).json({ message: "Sample not found" });
  }

  return res.status(200).json({ message: "Sample deleted" });
}

export default {
  getSamples,
  getSample,
  createSample,
  updateSample,
  deleteSample,
};
