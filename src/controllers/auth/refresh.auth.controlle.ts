import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { refreshTokenInput } from "../../validation/auth.validation";
import BadRequestError from "../../errors/badRequest.error";
import ForbiddenError from "../../errors/forbidden.error";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/jwt";
import { findUser } from "../../services/user.services";
import TokenModel from "../../models/token.model";
import { ErrorCode } from "../../errors/custom.error";
import { validateEnv } from "../../config/env.config";

export const refreshToken = async (
  req: Request<object, object, refreshTokenInput>,
  res: Response
) => {
  if (req.cookies?.jwt) {
    return res.status(401).json({ message: "Refresh Token missing" });
  }
  const { email } = req.body;

  const user = await findUser({ email }, { select: "+password", lean: true });

  if (!user) {
    throw new ForbiddenError("user does not exists", ErrorCode.FORBIDDEN);
  }

  const jwtRefreshConfig = validateEnv()?.jwtconfig.refreshaccessSecret ?? "";
  const refreshTokenCookie = req.cookies.jwt;
  const secretKey = validateEnv()?.jwtconfig.accessSecret ?? "";

  jwt.verify(
    jwtRefreshConfig,
    refreshTokenCookie,
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(406).json({ message: "Unauthorize" });
      }

      const accessToken = signJwt({ userId: user._id }, secretKey as string, {
        expiresIn: "15m",
      });

      await TokenModel.create({
        token: accessToken,
        userId: user._id,
        expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
      });

      res
        .status(200)
        .json({ success: true, user: user, message: "success", accessToken });
    }
  );
};
