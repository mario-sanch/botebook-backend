import { connect, set } from "mongoose";
import { validateEnv } from "./env.config";

const MONGO_DB_URI = validateEnv().ATLAS_URI;

export const connectToDB = async () => {
  try {
    set("strictQuery", false);
    const db = await connect(MONGO_DB_URI ?? "");
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
};
