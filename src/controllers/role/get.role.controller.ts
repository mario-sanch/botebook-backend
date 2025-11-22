import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.error";
import InternalServerError from "../../errors/internalServer.error";
import { ErrorCode } from "../../errors/custom.error";
import { getAllRoles, findRoleById } from "../../services/rol.services";

export const getAllRole = async (req: Request, res: Response) => {
  try {
    const roles = await getAllRoles();
    res.status(200).json({ roles, success: true });
  } catch (err) {
    throw new InternalServerError(
      "Failed to fetch roles",
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const role = await findRoleById(id ?? "");

    if (!role) {
      throw new NotFoundError("Role not found", ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ role, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch role with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
