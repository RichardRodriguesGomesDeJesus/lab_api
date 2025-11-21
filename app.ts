import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("This is the root route!");
});

app.use((req: Request, res: Response) => {
  res.send("API is running...nothing here!");
});

export default app;
