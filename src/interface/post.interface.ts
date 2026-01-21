import { Document, Schema, ObjectId } from "mongoose";

export interface IPost extends Document {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  dateCreated: Date;
}
