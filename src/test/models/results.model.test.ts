import Results from "../../src/models/results.model";

describe("Results Model", () => {
  test("should create a Results instance", () => {
    const r = new Results();
    r.value = "Positive";

    expect(r).toBeInstanceOf(Results);
    expect(r.value).toBe("Positive");
  });
});