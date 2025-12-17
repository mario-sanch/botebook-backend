import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateEnv } from "../../config/env.config";
import { signJwt } from "../../utils/jwt";
import { refreshTokenInput } from "../../validation/auth.validation";
import { findUser } from "../../services/user.services";
import tokenModel from "../../models/token.model";

export async function refreshToken(
  req: Request<object, object, refreshTokenInput>,
  res: Response
) {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const { email } = req.body;

  const user = await findUser({ email }, { select: "+password", lean: true });

  const secret = validateEnv()?.jwtconfig.accessSecret ?? "";

  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const newAccessToken = signJwt({ userId: user?._id }, secret as string, {
      expiresIn: "15m",
    });

    await tokenModel.create({
      token: newAccessToken,
      userId: user?._id,
      expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
    });

    res
      .status(200)
      .json({ success: true, user: user, message: "success", newAccessToken });
  });
}
