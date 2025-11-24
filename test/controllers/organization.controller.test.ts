import { Response, Request } from "express";
import Organization from "../../models/organization.model.ts";

const mockRepository = {
  find: jest.fn(),
};

jest.mock("../../datasource", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  },
}));

import organizationController from "../../controllers/organization.controller.ts";

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

describe("Organization controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getOrganizations", () => {
    it("", async () => {
      const mockOrganizations: Organization[] = [
        {
          organizationId: "1",
          name: "Org 1",
          cnpj: "12345678901234",
          localization: { latitude: 0, longitude: 0 },
        },
        {
          organizationId: "2",
          name: "Org 2",
          cnpj: "98765432109876",
          localization: { latitude: 10, longitude: 0 },
        },
      ];

      mockRepository.find.mockResolvedValue(mockOrganizations);

      const { req, res } = mockRequestResponse({});

      await organizationController.getOrganizations(req, res);

      expect(mockRepository.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrganizations);
    });
  });
});
