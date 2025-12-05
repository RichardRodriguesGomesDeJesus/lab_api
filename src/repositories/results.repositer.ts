import Results from "../models/resultados.model.ts";
import { AppDataSource } from "../datasource.ts";
const results: Results[] = [];

const repository = AppDataSource.getRepository(Results);

async function getResults(): Promise<Results[]> {
  const results = await repository.find();
  return results;
}

async function getResultById(id: string): Promise<Results | null> {
  return await repository.findOneBy({ resultId: id });
}

async function createResult(
  sampleId: string,
  sampleStatus: number,
  analysisDate: string,
  resultDate: string,
  report: string,
  organizationId: string
): Promise<Results> {
  const results = new Results(
    sampleId,
    sampleStatus,
    analysisDate,
    resultDate,
    report
  );
  const newResults = await repository.save(results);
  return newResults;
}

async function updateResultById(
  sampleId: string,
  sampleStatus: number,
  analysisDate: string,
  resultDate: string,
  report: string,
  id: string
): Promise<Results | null> {
  const result = await repository.findOneBy({ resultId: id });
  if (!result) {
    return null;
  }
  result.sampleId = sampleId;
  result.sampleStatus = sampleStatus;
  result.analysisDate = analysisDate;
  result.resultDate = resultDate;
  result.report = report;
  return await repository.save(result);
}

function deleteResultById(id: string): boolean {
  const resultIndex = results.findIndex((res) => res.resultId === id);

  if (resultIndex === -1) {
    return false;
  }
  results.splice(resultIndex, 1);
  return true;
}

export default {
  getResults,
  getResultById,
  createResult,
  updateResultById,
  deleteResultById,
};
