import { Sample } from "../../src/models/sample.model";

describe("Sample Model", () => {
  test("should create a Sample instance", () => {
    const sample = new Sample();
    sample.type = "Blood";

    expect(sample).toBeInstanceOf(Sample);
    expect(sample.type).toBe("Blood");
  });
});