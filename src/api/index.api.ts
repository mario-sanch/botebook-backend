import express from "express";
import role from "./role.api";
import auth from "./auth.api";
import user from "./user.api";
import post from "./post.api";

const router = express.Router();

router.use("/role", role);
router.use("/auth", auth);
router.use("/users", user);
router.use("/posts", post);

router.get("/", (req, res) => {
  res.json({ message: "Hello from default api" });
});

export default router;
