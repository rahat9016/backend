import { z } from 'zod';

const admissionFormSchema = z.object({
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

const onlineAppointmentZodSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(1, 'First name is required'),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .min(1, 'Last name is required'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    mobileNumber: z
      .string({ required_error: 'Mobile number is required' })
      .min(1, 'Mobile number is required'),
    gradeLevel: z
      .string({ required_error: 'Grade level is required' })
      .min(1, 'Grade level is required'),
    preferredCallDate: z.string({
      required_error: 'Preferred call date is required',
    }),
    preferredCallTime: z.string({
      required_error: 'Preferred call date is required',
    }),
    subject: z
      .string({ required_error: 'Subject is required' })
      .min(1, 'Subject is required'),
    additionalMessage: z
      .string({ required_error: 'Additional message is required' })
      .min(1, 'Additional message is required'),
  }),
});

const schoolTourBookingZodSchema = z.object({
  body: z.object({
    parentName: z
      .string({ required_error: 'Parent name is required' })
      .min(1, 'Parent name is required'),
    studentName: z
      .string({ required_error: 'Student name is required' })
      .min(1, 'Student name is required'),
    studentCurrentSchool: z
      .string({ required_error: 'Student current school is required' })
      .min(1, 'Student current school is required'),
    studentCurrentGrade: z
      .string({ required_error: 'Student current grade is required' })
      .min(1, 'Student current grade is required'),
    studentBirthDate: z.string({
      required_error: 'Student birth date is required',
    }),
    schoolTourDate: z.string({
      required_error: 'School tour date is required',
    }),
    preferredTime: z.string({
      required_error: 'Preferred time is required',
    }),
    mobileNumber: z
      .string({ required_error: 'Mobile number is required' })
      .min(1, 'Mobile number is required'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
  }),
});

export const preRegisterZodSchema = z.object({
  body: z.object({
    parentName: z
      .string({ required_error: 'Parent name is required' })
      .min(1, 'Parent name is required'),
    parentEmail: z
      .string({ required_error: 'Parent email is required' })
      .email('Invalid email format'),
    parentContactNumber: z
      .string({ required_error: 'Contact number is required' })
      .min(1, 'Contact number is required'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    grade: z
      .string({ required_error: 'Grade is required' })
      .min(1, 'Grade is required'),
    studentName: z
      .string({ required_error: 'Student name is required' })
      .min(1, 'Student name is required'),
    studentGender: z.enum(['Male', 'Female'], {
      required_error: 'Gender is required',
    }),
    studentDOB: z
      .string({ required_error: 'Date of birth is required' })
      .min(1, 'Date of birth is required'),
    studentNationality: z
      .string({ required_error: 'Student nationality is required' })
      .min(1),
    currentSchool: z
      .string({ required_error: 'Current school is required' })
      .min(1),
  }),
});

export const feedbackZodSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    isRelativeStudying: z.enum(['Yes', 'No'], {
      required_error: 'Please select if your relative is currently studying',
    }),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
});

export const faqZodSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    question: z.string().min(10, 'Message must be at least 10 characters'),
  }),
});

export const admissionValidation = {
  admissionFormSchema,
  onlineAppointmentZodSchema,
  schoolTourBookingZodSchema,
  preRegisterZodSchema,
  feedbackZodSchema,
  faqZodSchema
};
