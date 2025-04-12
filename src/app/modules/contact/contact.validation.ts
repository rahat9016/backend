import { z } from 'zod';

const createContactZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, { message: 'Name must be at least 3 characters long' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email address' }),
    phone: z
      .string({
        required_error: 'Phone number is required',
      })
      .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
        message:
          'Phone number is invalid. Ensure it follows a valid format like +1 (567) 771-4125.',
      })
      .refine(
        value => {
          const cleaned = value.replace(/\D/g, '');
          return cleaned.length >= 10;
        },
        {
          message: 'Phone number must contain at least 10 numeric digits.',
        }
      )
      .refine(value => value.replace(/\D/g, '').length <= 20, {
        message: 'Phone number cannot exceed 20 numeric digits.',
      }),
    message: z
      .string({
        required_error: 'Message is required',
      })
      .min(10, { message: 'Message must be at least 10 characters long' }),
  }),
});

export const ContactValidation = {
  createContactZodSchema,
};
