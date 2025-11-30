import app from "./app";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

try {
  // AppDataSource.initialize();
  console.log("Database connection established sucessfully!");
} catch (err) {
  console.error("Error connection to database:", err);
  // process.exit(1);
}

const port = process.env.PORTNUMBER;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API is ready to use!`);
});
