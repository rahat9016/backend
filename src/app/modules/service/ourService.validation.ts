import { z } from 'zod';

const createOurServiceZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(5),
    description: z.string().optional(),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});

const updateOurServiceZodSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const OurServiceValidation = {
  createOurServiceZodSchema,
  updateOurServiceZodSchema,
};
