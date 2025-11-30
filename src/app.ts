import express, { Request, Response } from "express";
import routerOrganization from "./routes/organization.router";
import routerResults from "./routes/result.router";
import routerUsers from "./routes/user.router";
import routerLogin from "./routes/login.router";

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
app.use("/v1/lab/login", routerLogin);
export default app;
