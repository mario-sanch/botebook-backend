import { Express } from "express";
import { bootstrapExpress } from "./app";
import { logger } from "../config/loggers";
import { validateEnv } from "../config/env.config";
import { connectToDB } from "../config/mongoose";

export const bootstrap = async () => {
  validateEnv();
  await connectToDB();
  const app: Express = bootstrapExpress();
  logger.info("Express app initiated");

  return app;
};
