import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Results } from "../../models/results.model";

const resultsRepository = AppDataSource.getRepository(Results);

export async function getResults(req: Request, res: Response) {
  const results = await resultsRepository.find();
  return res.status(200).json(results);
}

export async function getResult(req: Request, res: Response) {
  const id = req.params.id;
  const result = await resultsRepository.findOneBy({ id });

  if (!result) {
    return res.status(404).json({ message: "Result not found" });
  }
  return res.status(200).json(result);
}

export async function createResult(req: Request, res: Response) {
  const { value, sampleId } = req.body;

  const result = resultsRepository.create({ value, sampleId });
  await resultsRepository.save(result);

  return res.status(201).json(result);
}

export async function updateResult(req: Request, res: Response) {
  const id = req.params.id;
  const result = await resultsRepository.findOneBy({ id });

  if (!result) {
    return res.status(404).json({ message: "Result not found" });
  }

  resultsRepository.merge(result, req.body);
  await resultsRepository.save(result);

  return res.status(200).json(result);
}

export async function deleteResult(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await resultsRepository.delete(id);

  if (deleted.affected === 0) {
    return res.status(404).json({ message: "Result not found" });
  }

  return res.status(200).json({ message: "Result deleted" });
}

export default {
  getResults,
  getResult,
  createResult,
  updateResult,
  deleteResult,
};