import { z } from 'zod';

const categoryFormSchema = z.object({
  body: z.object({
    // Student Information
    name: z.string({ required_error: 'Category name is required' }),
    description: z.string().optional(),
  }),
});

export const groupValidation = {
  categoryFormSchema
};
