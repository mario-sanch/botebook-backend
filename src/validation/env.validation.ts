import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string({ error: "Port is required" }),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ATLAS_URI: z.string({ error: "Db url is required" }),
});

export type EnvConfig = z.infer<typeof envSchema>;
