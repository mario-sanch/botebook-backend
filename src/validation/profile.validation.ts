import { z, object } from "zod";

export const createProfileSchema = z.object({
  body: object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    age: z.number().min(0, { message: "Age cannot be negative" }).optional(),
    address: z.string().optional(),
    email: z.email("Email is required"),
    phoneNumber: z
      .string()
      .regex(/\d{4}-\d{4}/, { message: "Invalid phone number format" })
      .optional(),
    userId: z.string("User Id is required"),
  }),
});
