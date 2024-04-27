import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`);
});
