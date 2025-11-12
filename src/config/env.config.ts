import dotenv from "dotenv";
import { EnvConfig, envSchema } from "../validation/env.validation";
import { ZodError } from "zod";

dotenv.config();

export const validateEnv = () => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      port: +envVars.PORT,
      env: envVars.NODE_ENV,
      ATLAS_URI: envVars.ATLAS_URI,
    };
  } catch (error) {
    let message = undefined;
    if (error instanceof ZodError) {
      message = error.message;
      console.error("Validation failed: ", error.issues);
    } else {
      console.log("Error parsing environment variables: ", error);
    }
  }
};
