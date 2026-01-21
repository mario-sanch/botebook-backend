import { Request, Response } from "express";
// import service

export async function getPosts(req: Request, res: Response) {
  try {
    // call service -> model
    res.status(200).json({ content: "hola soy un post de prueva" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching Posts" });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    // validate
    // call service -> model
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error creating Post", err });
  }
}

export async function getPostById(req: Request, res: Response) {
  try {
    // call service -> model
    const { id } = req.params;
    res.status(200).json({ content: "Soy un Post" });
  } catch (err) {
    res.status(500).json({ message: "Error getting post by id" });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // call service
    res.status(200).json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // call service
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
}
