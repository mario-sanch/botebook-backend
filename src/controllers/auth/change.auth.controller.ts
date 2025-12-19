import asyncHandler from "express-async-handler";
import { changeOldPasswordInput } from "../../validation/auth.validation";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUserMessage } from "../../middleware/authJWT.middleware";
import NotFoundError from "../../errors/notFound.error";
import BadRequestError from "../../errors/badRequest.error";
import { findUser } from "../../services/user.services";
import { ErrorCode } from "../../errors/custom.error";

export const changePassword = async (
  req: any, // IUserMessage<object, object, changeOldPasswordInput>
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userData.userId;

  const user = await findUser({ _id: userId }, { select: "+password" });

  if (!user) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new BadRequestError("Incorrect password", ErrorCode.BAD_REQUEST);
  }

  const salt = await bcrypt.getSalt("10");
  const hashPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashPassword;

  await user.save();

  res
    .status(200)
    .json({ message: "Password changed successfully", success: true });
};
