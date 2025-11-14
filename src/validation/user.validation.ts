import { z, object, string, array } from "zod";

export const createUserSchema = z.object({
  body: object({
    email: z.email("Invalid email format"),
    password: z
      .string("Password is required")
      .min(6, "Password must be at leat 6 characters"),
    name: z.string("Name is required"),
    phoneNumber: z
      .string()
      .regex(/\d{4}-\d{4}/, "Invalid phone format")
      .optional(),
    role: z.string("role is required"),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
