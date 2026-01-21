import { Schema, model } from "mongoose";
import { IPost } from "../interface/post.interface";

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    dateCreated: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<IPost>("Post", postSchema);
