import dotenv from "dotenv";
import { envSchema } from "../validation/env.validation";

dotenv.config();

interface ValidatedEnv {
  port: number;
  env: "development" | "production" | "test";
  ATLAS_URI: string;
  jwtconfig: {
    accessSecret: string;
    refreshaccessSecret: string;
  };
}

export const validateEnv = (): ValidatedEnv => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(
      `Environment validation failed:\n${JSON.stringify(result.error.issues, null, 2)}`
    );
  }

  const envVars = result.data;
  return {
    port: +envVars.PORT,
    env: envVars.NODE_ENV,
    ATLAS_URI: envVars.ATLAS_URI,
    jwtconfig: {
      accessSecret: envVars.JWT,
      refreshaccessSecret: envVars.JWT_REFRESH,
    },
  };
};
