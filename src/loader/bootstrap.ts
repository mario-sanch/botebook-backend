import { bootstrapExpress } from "./app";
import { logger } from "../config/loggers";
import { validateEnv } from "../config/env.config";
import { connectToDB } from "../config/mongoose";

export const bootstrap = async (app: any) => {
  validateEnv();
  await connectToDB();
  bootstrapExpress(app);
  logger.info("Express app initiated");
};
