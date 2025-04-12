import { z } from 'zod';

export const admissionFormSchema = z.object({
  body: z.object({
    // Student Information
    firstName: z.string({ required_error: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string({ required_error: 'Last name is required' }),
    nickName: z.string().optional(),
    gender: z.string({ required_error: 'Gender is required' }),
    nationality: z.string({ required_error: 'Nationality is required' }),
    phone: z.string().optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    address: z.string({ required_error: 'Address is required' }),
    gradeApplyingFor: z.string({
      required_error: 'Grade applying for is required',
    }),
    yearApplyingFor: z.string({
      required_error: 'Year applying for is required',
    }),
    currentSchoolName: z.string().optional(),

    // Parent/Guardian Information
    parentTitle: z.string({ required_error: 'Title is required' }),
    parentFirstName: z.string({
      required_error: 'Parent first name is required',
    }),
    parentMiddleName: z.string().optional(),
    parentLastName: z.string({
      required_error: 'Parent last name is required',
    }),
    parentRelation: z.string({ required_error: 'Relation is required' }),
    parentNationality: z.string({
      required_error: 'Parent nationality is required',
    }),
    parentPhone: z.string().optional(),
    parentEmail: z
      .string({ required_error: 'Parent email is required' })
      .email('Invalid email format'),
    parentAddress: z.string({ required_error: 'Parent address is required' }),

    // Additional Information
    referralSource: z.string().optional(),
    comments: z.string().optional(),
  }),
});

export const admissionValidation = {
  admissionFormSchema,
};
