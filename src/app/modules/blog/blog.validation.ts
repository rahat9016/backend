import { z } from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    topic: z
      .string({
        required_error: 'Topic is required',
      })
      .min(5),
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(5),
    image: z.string({
      required_error: 'Image is required',
    }),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(5),
    author: z
      .string({
        required_error: 'Author is required',
      })
      .min(5),
    date: z.string({
      required_error: 'Date is required',
    }),
  }),
});

const updateBlogZodSchema = z.object({
  body: z.object({
    topic: z.string().min(5).optional(),
    title: z.string().min(5).optional(),
    image: z.string().optional(),
    description: z.string().min(5).optional(),
    author: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
