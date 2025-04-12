import { z } from 'zod';

const createCareerZodSchema = z.object({
  body: z.object({
    circularId: z.string({
      required_error: 'Circular Id is requires',
    }),
    circularTitle: z.string({
      required_error: 'Circular Title is required',
    }),
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, { message: 'Name must be at least 3 characters long' }),
    address: z.string({
      required_error: 'Address is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email address' }),
    experience: z
      .string({
        required_error: 'Year of experience is required',
      })
      .refine(value => !isNaN(Number(value)) && Number(value) >= 0, {
        message: 'Year of experience must be a non-negative number',
      }),
    position: z.string({
      required_error: 'Position is required',
    }),
    skills: z.string({
      required_error: 'Skill is required',
    }),
  }),
});

export const CareerValidation = {
  createCareerZodSchema,
};
