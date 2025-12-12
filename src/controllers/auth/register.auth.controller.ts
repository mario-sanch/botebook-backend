import { Request, Response } from "express";
import BadRequestError from "../../errors/badRequest.error";
import bcrypt from "bcryptjs";
import { generateRandom6DigitsString } from "../../utils/util";
import asyncHandler from "express-async-handler";
import { createUser, findUserByEmail } from "../../services/user.services";
import { ErrorCode } from "../../errors/custom.error";
import { getAllRoles } from "../../services/rol.services";
import { registerUserInput } from "../../validation/auth.validation";
import { IRole } from "../../interface/role.interface";
import { EventEmitterInstance } from "../../config/event-emitter";

export const registerUser = asyncHandler(
  async (req: Request<object, object, registerUserInput>, res: Response) => {
    const { email, password, name, phoneNumber } = req.body;

    const userExists = await findUserByEmail(email);

    if (userExists) {
      throw new BadRequestError(
        "User with this email already exists",
        ErrorCode.BAD_REQUEST
      );
    }

    const roles = await getAllRoles();
    const role: IRole | any = roles.find((r) => r.name === "SUPER_ADMIN");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const code = generateRandom6DigitsString();
    const verificationExpires =
      parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;

    await createUser({
      ...req.body,
      role: role,
      password: hashPassword,
      OTPCode: code,
      OTPCodeExpires: Date.now() + verificationExpires,
    });

    EventEmitterInstance.emit("signup", { code, name, email });

    res.status(201).json({ success: true, message: "Verification email sent" });
  }
);
