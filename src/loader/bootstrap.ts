import { Express } from "express";
import { bootstrapExpress } from "./app";
import { logger } from "../config/loggers";
import { validateEnv } from "../config/env.config";
import { connectToDB } from "../config/mongoose";

export const bootstrap = async (app: Express) => {
  validateEnv();
  await connectToDB();
  bootstrapExpress(app);
  logger.info("Express app initiated");
};
