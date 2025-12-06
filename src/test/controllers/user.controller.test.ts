import { Response, Request } from "express";
import User from "./../../src/models/user.model.ts";
import userController from "./../../src/controllers/user.controller.ts";

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

describe("Users controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("", async () => {
      const mockUsers: User[] = [
        {
            id : "1",
            username : "nome1",
            password : "hashcode1",
            userType : 1,
            registerDate : "XX/XX/XXXX",
            active : 1,
        },
        {
            id : "2",
            username : "nome2",
            password : "hashcode1",
            userType : 2,
            registerDate : "YY/YY/YYYY",
            active : 0,
        },
      ];

      mockRepository.find.mockResolvedValue(mockUsers);

      const { req, res } = mockRequestResponse({});

      userController.getResults(req, res);

      expect(mockRepository.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });
});
