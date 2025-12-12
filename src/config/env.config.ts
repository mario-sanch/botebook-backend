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
      jwtconfig: {
        accessSecret: envVars.JWT,
        refreshaccessSecret: envVars.JWT_REFRESH,
      },
      // smtp: {
      //   host: envVars.SMTP_HOST,
      //   port: envVars.SMTP_PORT,
      //   service: envVars.SMTP_SERVICE,
      //   mail: envVars.SMTP_MAIL,
      //   password: envVars.SMTP_PASSWORD,
      // },
    };
  } catch (error) {
    let message = undefined;
    if (error instanceof ZodError) {
      message = error.message;
      console.error("Validation failed: ", error.issues);
    } else {
      console.error("Error parsing environment variables: ", error);
    }
  }
};
