import { Request, Response } from "express";
import { RoleInterface } from "../../interface/role.interface";
import RoleModel from "../../models/role.model";
import InternalServerError from "../../errors/internalServer.error";
import { ErrorCode } from "../../errors/custom.error";
import { findRoleByName } from "../../services/rol.services";

export const createRole = async (req: Request, res: Response) => {
  try {
    const {
      name,
      permissions,
    }: { name: RoleInterface; permissions: string[] } = req.body;

    const existingRole = await findRoleByName(name);

    if (existingRole) {
      return res
        .status(400)
        .json({ message: "Role already exists", success: false });
    }

    const newRole = new RoleModel({ name, permissions });
    await newRole.save();

    res
      .status(201)
      .json({ message: "Role created successfully", success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to create role",
      ErrorCode.INTERNAL_SERVER
    );
  }
};
