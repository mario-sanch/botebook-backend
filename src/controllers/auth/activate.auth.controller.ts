import { Request, Response } from "express";
import { activateUserInput } from "../../validation/auth.validation";
import BadRequestError from "../../errors/badRequest.error";
import asyncHandler from "express-async-handler";
import { findUser } from "../../services/user.services";
import { createProfile } from "../../services/profile.services";
import { ErrorCode } from "../../errors/custom.error";

export const activateUser = asyncHandler(
  async (req: Request<object, object, activateUserInput>, res: Response) => {
    const { OTPCode, email } = req.body;

    const user = await findUser(
      { email },
      { select: "+password +OTPCode +OTPCodeExpires" }
    );

    if (!user)
      throw new BadRequestError("User does not exists", ErrorCode.BAD_REQUEST);

    if (user.isActive) {
      throw new BadRequestError(
        "User has been verified",
        ErrorCode.BAD_REQUEST
      );
    }

    const OTPCodeExpires: number = user.OTPCodeExpires ?? Date.now();
    if (user.OTPCode !== OTPCode || OTPCodeExpires < Date.now()) {
      throw new BadRequestError(
        "Invalid or expired OTP code",
        ErrorCode.BAD_REQUEST
      );
    }

    user.OTPCode = "";
    user.OTPCodeExpires = 0;
    user.isActive = true;
    const userId: any = user._id;

    await createProfile(userId);

    await user.save();

    res.status(201).json({ message: "Verified successfully", success: true });
  }
);
