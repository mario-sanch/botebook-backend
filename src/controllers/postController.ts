import { Request, Response, NextFunction } from "express";
import { Post } from "../models/postModel";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";

// async
export const getPosts = (req: Request, res: Response) => {
  try {
    // const db = database.getDb();

    // const data = await db.collection("posts").find({}).toArray();

    // if (data.length === 0) throw new Error("Data not found");

    // res.json(data);

    const post: Post = {
      id: 1,
      title: "test post",
      description: "this is a test post",
      content: "Just for testing",
      author: "Jonh Doe",
      dateCreated: new Date("2025-10-25"),
    };
    res.json({ status: "success", data: post });
  } catch (err) {
    throw new Error("Error getting posts");
  }
};

// async
export const getPost = (req: Request, res: Response) => {
  try {
    // const db = database.getDb();

    // const data = await db.collection('posts').findOne({_id: new ObjectId(req.params.id)});

    // if (Object.keys(data).length === 0) { throw new Error('Post was not found :(') }

    // res.json(data);

    const post: Post = {
      id: parseInt(req.params.id?.toString() ?? "-1"),
      title: "test post",
      description: "this is a test post",
      content: "Just for testing",
      author: "Jonh Doe",
      dateCreated: new Date("2025-10-25"),
    };
    res.status(200).json(post);
  } catch (err) {
    throw new Error("Error finding post");
  }
};

// async
export const createPost = (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const db = database.getDb();

    const mongoObject = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.author,
      dateCreated: req.body.dateCreated,
    };

    // const data = await db.collection('posts).insertOne(mongoObject);

    // res.json(data);

    res.status(201).json(mongoObject);
  } catch (err) {}
};

export const updatePost = (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const db = database.getDb();

    const mongoObject = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author,
        dateCreated: req.body.dateCreated,
      },
    };

    // const data = await db.collection('posts').updateOne({_id: new ObjectId(req.params.id)}, mongoObject);

    // res.json(data);

    res.json(mongoObject);
  } catch (err) {
    throw new Error("Error updating post");
  }
};

// async
export const deletePost = (req: Request, res: Response) => {
  try {
    // const db = database.getDb();
    // const result = await db.collection('posts').deleteOne({_id: new ObjectId(req.params.id)});

    // if (result.deletedCount === 1) res.json(data);

    // res.json(data);

    res.json(req.params.id);
  } catch (err) {
    throw new Error("Error deleting post");
  }
};
