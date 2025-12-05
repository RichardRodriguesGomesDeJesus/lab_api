import { Request, Response } from "express";
import sampleRepository from "../repositories/sample.repository";

function getSamples(req: Request, res: Response) {
  const samples = sampleRepository.getSamples();
  res.status(200).json(samples);
}

function getSample(req: Request, res: Response) {
  const id = req.params.id;
  const sample = sampleRepository.getSampleById(id);

  if (sample) {
    res.status(200).json(sample);
  } else {
    res.status(404).json({ mensagem: "Sample not found" });
  }
}

function createSample(req: Request, res: Response) {
  const { description, collectionDate, organizationId, localization } =
    req.body;

  const sample = sampleRepository.createSample(
    description,
    collectionDate,
    organizationId,
    localization
  );

  res.status(201).json(sample);
}

function updateSample(req: Request, res: Response) {
  const id = req.params.id;
  const { description, collectionDate, organizationId, localization } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Sample ID is required" });
  }

  const updated = sampleRepository.updateSampleById(
    description,
    collectionDate,
    organizationId,
    localization,
    id
  );

  if (updated) {
    res.status(200).json(updated);
  } else {
    res.status(404).json({ error: "Sample not found" });
  }
}

function deleteSample(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = sampleRepository.deleteSampleById(id);

  if (deleted) {
    res.status(200).json({ message: "Sample deleted" });
  } else {
    res.status(404).json({ error: "Sample not found" });
  }
}

export default {
  getSamples,
  getSample,
  createSample,
  updateSample,
  deleteSample,
};