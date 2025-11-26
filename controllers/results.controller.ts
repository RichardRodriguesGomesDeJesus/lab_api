import resultsRepositer from "../repositories/results.repositer.ts";
import { Request, Response } from "express";
import Results from "../models/resultados.model.ts";

function getResults(req: Request, res: Response) {
  const results = resultsRepositer.getResults();
  res.status(200).json(results);
}

function getResult(req: Request, res: Response) {
  ///results/{id}
  const id = req.params.id;
  const result = resultsRepositer.getResultById(id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({
      mensagem: "Resultado não encontrado.",
    });
  }
}

function createResult(req: Request, res: Response) {}
