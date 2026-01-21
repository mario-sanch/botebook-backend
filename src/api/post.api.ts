import { Router } from "express";
import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post/post.controller";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
