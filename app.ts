import express, { Request, Response } from "express";
import routerOrganization from "./src/routes/organization.router.ts";
import routerResults from "./src/routes/result.router.ts";
import routerUsers from "./src/routes/user.router.ts";

const app = express();

app.use(express.json());

app.get("/v1/lab/", (req: Request, res: Response) => {
  res.send("The root route!");
});

app.use((req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/v1/lab/organization", routerOrganization);
app.use("/v1/lab/results", routerResults);
app.use("/v1/lab/users", routerUsers);
export default app;
