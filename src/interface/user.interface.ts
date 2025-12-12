import { Document, Schema } from "mongoose";
import { IRole } from "./role.interface";

export interface IUser extends Document {
  password: string;
  phoneNumber: string;
  email: string;
  name: string;
  isActive: boolean;
  OTPCode?: string; // OTP = one time password
  OTPCodeExpires?: number;
  passwordResetCode?: string;
  role: IRole;
}
