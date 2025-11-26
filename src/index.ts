import express from "express";
import users from "./routes/user.router"

const app = express();
app.use(express.json());

app.use("/api/users", users);

app.listen(3000);
