import { Response, Request } from "express";
import Results from "./../../src/models/resultados.model.ts";
import resultsController from "./../../src/controllers/results.controller.ts";

const mockRepository = {
  find: jest.fn(),
};

jest.mock("../../datasource", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  },
}));


const mockRequestResponse = (reqOverrides: Partial<Request>) => {
  const req: Partial<Request> = {
    params: {},
    body: {},
    ...reqOverrides,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  };

  return { req: req as Request, res: res as Response };
};

describe("Sample results controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getResults", () => {
    it("", async () => {
      const mockResults: Results[] = [
        {
            resultId : "1",
            sampleId : "1",
            sampleStatus : 1,
            analysisDate : "XX/XX/XXXX",
            resultDate : "xx/xx/xxxx",
            report : "XXXXXXXXXXXXXXXXX",
        },
        {
            resultId : "2",
            sampleId : "2",
            sampleStatus : 2,
            analysisDate : "YY/YY/YYYY",
            resultDate : "yy/yy/yyyy",
            report : "YYYYYYYYYYYYYYYYY",
        },
      ];

      mockRepository.find.mockResolvedValue(mockResults);

      const { req, res } = mockRequestResponse({});

      resultsController.getResults(req, res);

      expect(mockRepository.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResults);
    });
  });
});
