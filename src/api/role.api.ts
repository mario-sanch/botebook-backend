import express from "express";
import {
  createRole,
  getAllRole,
  getRoleById,
} from "../controllers/role/index.role.controller";

const router = express.Router();

router.post("/create", createRole);

router.get("/", getAllRole);

router.get("/:id", getRoleById);

export default router;
