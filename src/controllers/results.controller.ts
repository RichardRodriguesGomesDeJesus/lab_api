import { Request, Response } from "express";
import resultsRepositer from "../repositories/results.repositer.ts";

async function getResults(req: Request, res: Response) {
  const results = await resultsRepositer.getResults();
  res.status(200).json(results);
}

async function getResult(req: Request, res: Response) {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: "Missing required fields" });
  }

  const result = await resultsRepositer.getResultById(id);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({
      mensagem: "Result not found",
    });
  }
}

async function createResult(req: Request, res: Response) {
  const {
    sampleId,
    sampleStatus,
    analysisDate,
    resultDate,
    report,
    IdOrganization,
  } = req.body;
  const result = resultsRepositer.createResult(
    sampleId,
    parseInt(sampleStatus),
    analysisDate,
    resultDate,
    report,
    IdOrganization
  );
  res.status(201).json(result);
}

async function updateResult(req: Request, res: Response) {
  const id = req.params.id;
  const { sampleId, sampleStatus, analysisDate, resultDate, report } = req.body;
  if (
    !id ||
    !sampleId ||
    !sampleStatus ||
    !analysisDate ||
    !resultDate ||
    !report
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await resultsRepositer.updateResultById(
    sampleId,
    parseInt(sampleStatus),
    analysisDate,
    resultDate,
    report,
    id
  );

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "Result not found" });
  }
}

async function deleteResult(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = await resultsRepositer.deleteResultById(id);

  if (deleted) {
    res.status(200).json({ message: "Result deleted" });
  } else {
    res.status(404).json({ error: "Result not found" });
  }
}

export default {
  getResults,
  getResult,
  createResult,
  updateResult,
  deleteResult,
};
