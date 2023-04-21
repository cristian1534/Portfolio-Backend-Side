import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const MONGODB_URI = isProduction
  ? process.env.MONGODB_URI_PROD
  : process.env.MONGODB_URI_DEV;

export function database() {
  mongoose.Promise = Promise;
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MONGO_DB"));
  mongoose.connection.on("error", (error: Error) => console.log(error.message));
}
