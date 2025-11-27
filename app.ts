import express, { Request, Response } from "express";
import routerOrganization from "./src/routes/organization.router.ts";

const app = express();

app.use(express.json());

app.get("/v1/lab/", (req: Request, res: Response) => {
  res.send("The root route!");
});

app.use((req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/v1/lab/organization", routerOrganization);

export default app;
