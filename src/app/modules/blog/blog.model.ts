import { Schema, model } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    topic: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model<IBlog, BlogModel>('Blog', BlogSchema);
