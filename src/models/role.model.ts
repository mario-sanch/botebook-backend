import { Schema, model } from "mongoose";
import { IRole } from "../interface/role.interface";

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, index: true },
    permissions: [{ type: String, required: true }],
    grantAll: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IRole>("Role", roleSchema);
