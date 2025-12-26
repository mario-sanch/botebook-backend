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

export const activateUserSchema = z.object({
  body: object({
    OTPCode: z.string(),
    email: z.string("Invalid email format"),
  }),
});

export const forgotPasswordSchema = z.object({
  body: object({
    email: z.email("Invalid email format"),
  }),
});

export const resetPasswordSchema = z.object({
  body: object({
    email: z.string("Invalid email format"),
    passwordResetCode: z.string(),
    password: z.string("Password is required").min(6, "Minimum 6 characters"),
  }),
});

export const loginUserSchema = z.object({
  body: object({
    email: z.string("Missing Email"),
    password: z.string(),
  }),
});

export const changeOldPasswordSchema = z.object({
  body: object({
    oldPassword: z
      .string("Password is required")
      .min(6, "Minimum 6 characters"),
    newPassword: z
      .string("New password is required")
      .min(6, "Minimum 6 characters"),
  }),
});

export const refreshTokenSchema = z.object({
  body: object({
    email: z.string("Missing Email"),
  }),
});

export type registerUserInput = z.infer<typeof registerUserSchema>["body"];
export type activateUserInput = z.infer<typeof activateUserSchema>["body"];
export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>["body"];
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>["body"];
export type loginUserInput = z.infer<typeof loginUserSchema>["body"];
export type changeOldPasswordInput = z.infer<
  typeof changeOldPasswordSchema
>["body"];
export type refreshTokenInput = z.infer<typeof refreshTokenSchema>["body"];
