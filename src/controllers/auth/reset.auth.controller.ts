import { Request, Response } from "express";
import { resetPasswordInput } from "../../validation/auth.validation";
import bcrypt from "bcryptjs";
import BadRequestError from "../../errors/badRequest.error";
import asyncHandler from "express-async-handler";
import { findUserByEmail } from "../../services/user.services";
import { ErrorCode } from "../../errors/custom.error";

export const resetPasswordHandler = asyncHandler(
  async (req: Request<object, object, resetPasswordInput>, res: Response) => {
    const { email, passwordResetCode, password } = req.body;

    const user = await findUserByEmail(email);

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode ||
      (user.OTPCodeExpires && user.OTPCodeExpires < Date.now())
    ) {
      throw new BadRequestError(
        "Could not reset password",
        ErrorCode.BAD_REQUEST
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.passwordResetCode = "";
    await user.save();

    res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  }
);
