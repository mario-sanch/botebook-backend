import { Request, Response } from "express";
import { loginUserInput } from "../../validation/auth.validation";
import BadRequestError from "../../errors/badRequest.error";
import ForbiddenError from "../../errors/forbidden.error";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/jwt";
import { findUser } from "../../services/user.services";
import TokenModel from "../../models/token.model";
import { ErrorCode } from "../../errors/custom.error";
import { validateEnv } from "../../config/env.config";

export const login = asyncHandler(
  async (req: Request<object, object, loginUserInput>, res: Response) => {
    const { password, email } = req.body;

    const user = await findUser({ email }, { select: "+password", lean: true });

    if (!user) {
      throw new ForbiddenError("User does not exists", ErrorCode.FORBIDDEN);
    }

    if (!user.isActive) {
      throw new BadRequestError(
        "Please verify your email first",
        ErrorCode.BAD_REQUEST
      );
    }

    const role = user.role;

    const secretKey = validateEnv()?.jwtconfig.accessSecret;

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new ForbiddenError("Invalid credentials", ErrorCode.FORBIDDEN);
    }

    const accessToken = signJwt({ userId: user._id }, secretKey as string, {
      expiresIn: "3d",
    });

    await TokenModel.create({
      token: accessToken,
      userId: user._id,
      expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
    });

    //Remove sensitive data from user object
    //delete user.password;

    res.status(200).json({
      success: true,
      user: user,
      message: "Logged in successfully",
      accessToken,
    });
  }
);
