import express, { Router } from "express";
import { AuthJWT, authorizeRoles } from "../middleware/authJWT.middleware";
import { IUser } from "../interface/user.interface";

const router: Router = express.Router();

router.get("/", (req, res) => {
  const result: IUser[] = [];

  res.status(200).json([]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`holas id: ${id}`);
});

router.post("/", () => {});

router.put("/:id", () => {});

router.delete("/:id", () => {});

export default router;
