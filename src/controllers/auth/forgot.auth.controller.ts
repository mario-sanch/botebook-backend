import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.error";
import BadRequestError from "../../errors/badRequest.error";
import { generateRandom6DigitsString } from "../../utils/util";
import { forgotPasswordInput } from "../../validation/auth.validation";
import asyncHandler from "express-async-handler";
import { findUserByEmail } from "../../services/user.services";
import { EventEmitterInstance } from "../../config/event-emitter";
import { ErrorCode } from "../../errors/custom.error";

export const forgotPassword = asyncHandler(
  async (req: Request<object, object, forgotPasswordInput>, res: Response) => {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
    }

    if (!user.isActive) {
      throw new BadRequestError(
        "Please verify your email first",
        ErrorCode.BAD_REQUEST
      );
    }

    const code = generateRandom6DigitsString();
    const verificationExpires =
      parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60;

    user.passwordResetCode = code;
    user.OTPCodeExpires = Date.now() + verificationExpires;

    await user.save();

    const link = `http://localhost:3000/auth/reset?passwordResetCode=${code}&email=${email}`;

    EventEmitterInstance.emit("forgot", {
      code,
      name: user.name,
      email: user.email,
      link,
    });

    res.status(201).json({
      message:
        "If a user with that email is registered, you will receive a password reset email or OTP code via SMS",
      email,
      success: true,
    });
  }
);
