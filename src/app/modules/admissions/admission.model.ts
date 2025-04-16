import { Schema, model } from 'mongoose';
import {
  IAdmission,
  IAdmissionModel,
  IAppointment,
  IAppointmentModel,
  IFAQ,
  IFAQModel,
  IFeedbackModel,
  IPreRegister,
  IPreRegisterModel,
  ISchoolTourBooking,
  ISchoolTourBookingModel,
} from './auth.interface';

const AdmissionSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    nickName: { type: String },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
      required: true,
    },
    nationality: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gradeApplyingFor: { type: String, required: true },
    yearApplyingFor: { type: String, required: true },
    currentSchoolName: { type: String },

    // Parent/Guardian Information
    parentTitle: {
      type: String,
      enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
      required: true,
    },
    parentFirstName: { type: String, required: true },
    parentMiddleName: { type: String },
    parentLastName: { type: String, required: true },
    parentRelation: {
      type: String,
      enum: ['Father', 'Mother', 'Others'],
      required: true,
    },
    parentNationality: { type: String, required: true },
    parentPhone: { type: String },
    parentEmail: { type: String, required: true },
    parentAddress: { type: String, required: true },

    // Additional Information
    referralSource: { type: String },
    comments: { type: String },
  },
  {
    timestamps: true,
  }
);

const OnlineAppointmentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    preferredCallDate: {
      type: Date,
      required: true,
    },
    preferredCallTime: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    additionalMessage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SchoolTourBookingSchema = new Schema(
  {
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentCurrentSchool: {
      type: String,
      required: true,
      trim: true,
    },
    studentCurrentGrade: {
      type: String,
      required: true,
      trim: true,
    },
    studentBirthDate: {
      type: Date,
      required: true,
    },
    schoolTourDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const preRegisterSchema = new Schema(
  {
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    parentContactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentGender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    studentDOB: {
      type: String,
      required: true,
    },
    studentNationality: {
      type: String,
      required: true,
    },
    currentSchool: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const feedbackSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isRelativeStudying: { type: String, enum: ['Yes', 'No'], required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const faqSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    question: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


export const FAQSchema = model<IFAQ, IFAQModel>(
  'FAQ',
  faqSchema
);
export const FeedBackSchema = model<IPreRegister, IFeedbackModel>(
  'FeedBack',
  feedbackSchema
);
export const PreRegisterSchema = model<IPreRegister, IPreRegisterModel>(
  'PreRegister',
  preRegisterSchema
);
export const SchoolTourBooking = model<ISchoolTourBooking, ISchoolTourBookingModel>(
  'SchoolTourBooking',
  SchoolTourBookingSchema
);

export const Appointment = model<IAppointment, IAppointmentModel>(
  'Appointment',
  OnlineAppointmentSchema
);
export const Admission = model<IAdmission, IAdmissionModel>(
  'Admission',
  AdmissionSchema
);
