import app from "./app.ts";
try {
  // AppDataSource.initialize();
  console.log("Database connection established sucessfully!");
} catch (err) {
  console.error("Error connection to database:", err);
  // process.exit(1);
}

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
  console.log(`API is ready to use!`);
});
