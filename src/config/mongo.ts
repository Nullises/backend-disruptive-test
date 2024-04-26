// Database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

console.log("mongoURL", MONGO_URL);

export default function connectDB() {
  const url = MONGO_URL;

  try {
    mongoose.connect(url);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
}
