import Result from "../../models/resultados.model.ts";

describe("Results Model", () => {
  it("Create new result", () => {
    const sampleId = "s123";
    const sampleStatus = 1;
    const analysisDate = "XX/XX/XXXX";
    const resultDate = "YY/YY/YYYY";
    const report = "xxxxxxxxxx";


    const r = new Result(sampleId, sampleStatus, analysisDate, resultDate, report);
    expect(r.sampleId).toBe("s123");
    expect(r.sampleStatus).toBe(1);
    expect(r.analysisDate).toBe("XX/XX/XXXX");
    expect(r.resultDate).toBe("YY/YY/YYYY");
    expect(r.report).toBe("xxxxxxxxxx");
  });
  it("Update result", () => {
    const sampleId = "s123";
    const sampleStatus = 1;
    const analysisDate = "XX/XX/XXXX";
    const resultDate = "YY/YY/YYYY";
    const report = "xxxxxxxxxx";


    const r = new Result(sampleId, sampleStatus, analysisDate, resultDate, report);
    expect(r.sampleId).toBe("s123");
    expect(r.sampleStatus).toBe(1);
    expect(r.analysisDate).toBe("XX/XX/XXXX");
    expect(r.resultDate).toBe("YY/YY/YYYY");
    expect(r.report).toBe("xxxxxxxxxx");
  });
});
