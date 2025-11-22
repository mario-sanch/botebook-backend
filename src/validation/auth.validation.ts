import { object, z } from "zod";

export const registerUserSchema = z.object({
  body: object({
    name: z
      .string("Name is required")
      .min(2, "Name should have at least 2 characters")
      .max(20, "Name can have at most 20 characters"),
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .min(6, "Password should have at least 6 characters"),
    confirmPassword: z.string("Confirm password is required"),
    phoneNumber: z
      .string("Phone number is required")
      .min(8, "Missing numbers")
      .max(9, "More characters than expected"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});

export type registrerUserInput = z.infer<typeof registerUserSchema>;
