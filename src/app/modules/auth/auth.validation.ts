import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    fullName: z
      .string({
        required_error: 'Full name is required',
      })
      .min(1, 'Full name cannot be empty'),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),

    profile: z.string().optional(),

    description: z.string().optional(),

    contact: z
      .string({
        required_error: 'Contact is required',
      })
      .min(1, 'Contact cannot be empty'),

    address: z.string().optional(),

    activeStatus: z.boolean().default(true),

    role: z
      .enum(['admin', 'user'], {
        required_error: 'Role is required',
      })
      .default('admin'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
  }),
});
const signingUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
  }),
});
const tokenZodSchema = z.object({
  body: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});
const resetZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    oldPassword: z
      .string({
        required_error: 'Old password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
    newPassword: z
      .string({
        required_error: 'New password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
  }),
});
export const authValidation = {
  createUserZodSchema,
  signingUserZodSchema,
  tokenZodSchema,
  resetZodSchema
};
