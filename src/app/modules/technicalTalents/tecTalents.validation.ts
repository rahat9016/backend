import { z } from 'zod';

const createTecTalentsZodSchema = z.object({
  body: z.object({
    companyName: z
      .string({
        required_error: 'Company name is required',
      })
      .min(3),
    address: z.string().optional(),
    country: z.string().optional(),
    noOfVacancy: z.string().optional(),
    project: z.string().optional(),
    softwareSkills: z.string().optional(),
    additional: z.string().optional(),
    responsibilities: z.string().optional(),
  }),
});

// const updateTecTalentsZodSchema = z.object({
//   body: z.object({
//     title: z.string().min(5).optional(),
//     description: z.string().optional(),
//     image: z.string().optional(),
//     activeStatus: z.boolean().optional(),
//   }),
// });

export const TecTalentsValidation = {
  createTecTalentsZodSchema,
  //   updateTecTalentsZodSchema,
};
