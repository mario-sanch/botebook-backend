import { Router, Request, Response } from "express";
import { body } from "express-validator";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

const postValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("dateCreated").isDate().withMessage("Date Created must be a valid date"),
];

//async
router.get("/posts", getPosts);

//async
router.get("/posts/:id", getPost);

//async
router.post("/posts", postValidationRules, createPost);

// async
router.put("/posts/:id", postValidationRules, updatePost);

// async
router.delete("/posts/:id", deletePost);

export default router;
