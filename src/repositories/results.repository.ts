import Results from "../models/results.model";

const results: Results[] = [];

function getResults(): Results[] {
  return results;
}

function getResultById(id: string): Results | undefined {
  return results.find((res) => res.resultId == id);
}

function createResult(
  sampleId: string,
  sampleStatus: number,
  analysisDate: string,
  resultDate: string,
  report: string
): Results {
  const res = new Results(
    sampleId,
    sampleStatus,
    analysisDate,
    resultDate,
    report
  );
  results.push(res);
  return res;
}

function updateResultById(
  sampleId: string,
  sampleStatus: number,
  analysisDate: string,
  resultDate: string,
  report: string,
  id: string
): Results | null {
  const resIndex = results.findIndex((res) => res.resultId === id);
  if (!resIndex) {
    return null;
  }
  results[resIndex].sampleId = sampleId;
  results[resIndex].sampleStatus = sampleStatus;
  results[resIndex].analysisDate = analysisDate;
  results[resIndex].resultDate = resultDate;
  results[resIndex].report = report;
  return results[resIndex];
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
