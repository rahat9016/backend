import { z } from 'zod';

// Zod schema for creating a TalkForm
const createTalkFormZodSchema = z.object({
  body: z.object({
    companyName: z
      .string({
        required_error: 'Please provide the company name',
      })
      .min(3, 'Company name must be at least 3 characters'),
    address: z
      .string({
        required_error: 'Please provide the address',
      })
      .min(5, 'Address must be at least 5 characters'),
    country: z.string({
      required_error: 'Please select a country',
    }),
    project: z.string({
      required_error: 'Please select a project',
    }),
    additional: z
      .string({
        required_error: 'Please provide additional information',
      })
      .min(5, 'Additional information must be at least 5 characters'),
    responsibilities: z
      .string({
        required_error: 'Please provide responsibilities',
      })
      .min(10, 'Responsibilities must be at least 10 characters'),
    vacancy: z
      .number({
        required_error: 'Please provide the number of vacancies',
      })
      .min(1, 'Vacancies must be at least 1'),
    softwareSkill: z
      .string({
        required_error: 'Please provide the software skills',
      })
      .min(3, 'Software skills must be at least 3 characters'),
    skillRequirement: z
      .string({
        required_error: 'Please provide the skill requirements',
      })
      .min(3, 'Skill requirements must be at least 3 characters'),
  }),
});

// Zod schema for updating a TalkForm
const updateTalkFormZodSchema = z.object({
  body: z.object({
    companyName: z
      .string()
      .min(3, 'Company name must be at least 3 characters')
      .optional(),
    address: z
      .string()
      .min(5, 'Address must be at least 5 characters')
      .optional(),
    country: z.string().optional(),
    project: z.string().optional(),
    additional: z
      .string()
      .min(5, 'Additional information must be at least 5 characters')
      .optional(),
    responsibilities: z
      .string()
      .min(10, 'Responsibilities must be at least 10 characters')
      .optional(),
    vacancy: z.number().min(1, 'Vacancies must be at least 1').optional(),
    softwareSkill: z
      .string()
      .min(3, 'Software skills must be at least 3 characters')
      .optional(),
    skillRequirement: z
      .string()
      .min(3, 'Skill requirements must be at least 3 characters')
      .optional(),
  }),
});

// Exporting validation schemas
export const TalkFormValidation = {
  createTalkFormZodSchema,
  updateTalkFormZodSchema,
};
