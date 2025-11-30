import express from "express";
import users from "./routes/user.router";
import "dotenv";

const port = process.env.PORTNUMBER;
const app = express();
app.use(express.json());

app.use("/api/users", users);

app.listen(port);

console.log("Running");
