import express from "express";
import role from "./role.api";

const router = express.Router();

router.use("/role", role);

router.get("/", (req, res) => {
  res.json({ message: "Hello from default api" });
});

export default router;
