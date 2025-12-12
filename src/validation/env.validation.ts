import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string({ error: "Port is required" }),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ATLAS_URI: z.string({ error: "Db url is required" }),
  JWT: z.string("JWT is required"),
  JWT_REFRESH: z.string("JWT Refresh is required"),
  // SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),
  // SMTP_PORT: z.string().min(1, "SMTP_PORT IS REQUIRED"),
  // SMTP_SERVICE: z.string().min(1, "SMTP_SERVICE is required"),
  // SMTP_MAIL: z.string().min(1, "SMTP_MAIL is required"),
  // SMTP_PASSWORD: z.string().min(1, "SMTP_PASSWORD is required"),
});

export type EnvConfig = z.infer<typeof envSchema>;
