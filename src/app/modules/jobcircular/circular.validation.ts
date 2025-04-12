import { z } from 'zod';

const createCircularZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3, { message: 'Title must be at least 3 characters long' }),
    description: z.string({
      required_error: 'Description is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    deadline: z
      .string({ required_error: 'Deadline is required' })
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .transform(val => new Date(val)), // Converts string to Date
    position: z.string({
      required_error: 'Position is required',
    }),
    salary: z.string({
      required_error: 'Salary is required',
    }),
  }),
});

export const CircularValidation = {
  createCircularZodSchema,
};
