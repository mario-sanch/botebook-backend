import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "test response from file index api" });
});

export default router;
