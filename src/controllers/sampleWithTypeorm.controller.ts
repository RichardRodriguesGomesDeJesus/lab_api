import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Sample } from "../../models/sample.model";

const sampleRepository = AppDataSource.getRepository(Sample);

export async function getSamples(req: Request, res: Response) {
  const samples = await sampleRepository.find();
  return res.status(200).json(samples);
}

export async function getSample(req: Request, res: Response) {
  const id = req.params.id;
  const sample = await sampleRepository.findOneBy({ id });

  if (!sample) {
    return res.status(404).json({ message: "Sample not found" });
  }
  return res.status(200).json(sample);
}

export async function createSample(req: Request, res: Response) {
  const { type, description } = req.body;

  const sample = sampleRepository.create({ type, description });
  await sampleRepository.save(sample);

  return res.status(201).json(sample);
}

export async function updateSample(req: Request, res: Response) {
  const id = req.params.id;
  const sample = await sampleRepository.findOneBy({ id });

  if (!sample) {
    return res.status(404).json({ message: "Sample not found" });
  }

  sampleRepository.merge(sample, req.body);
  await sampleRepository.save(sample);

  return res.status(200).json(sample);
}

export async function deleteSample(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await sampleRepository.delete(id);

  if (deleted.affected === 0) {
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