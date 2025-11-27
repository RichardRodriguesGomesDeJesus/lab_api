import { Request, Response } from "express";
import resultsRepositer from "../repositories/results.repositer.ts";

function getResults(req: Request, res: Response) {
  const results = resultsRepositer.getResults();
  res.status(200).json(results);
}

function getResult(req: Request, res: Response) {
  const id = req.params.id;
  const result = resultsRepositer.getResultById(id);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({
      mensagem: "Result not found",
    });
  }
}

function createResult(req: Request, res: Response) {
  const { sampleId, sampleStatus, analysisDate, resultDate, report } = req.body;
  const result = resultsRepositer.createResult(
    sampleId,
    parseInt(sampleStatus),
    analysisDate,
    resultDate,
    report
  );
  res.status(201).json(result);
}

function updateResult(req: Request, res: Response) {
  const id = req.params.id;
  const { sampleId, sampleStatus, analysisDate, resultDate, report } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Organization ID is required" });
  }
  const result = resultsRepositer.updateResultById(
    sampleId,
    parseInt(sampleStatus),
    analysisDate,
    resultDate,
    report,
    id
  );
}

function deleteResult(req: Request, res: Response) {
  const id = req.params.id;
  const deleted = resultsRepositer.deleteResultById(id);

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
