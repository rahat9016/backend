import { Schema, model } from 'mongoose';
import { IAdmission, IAdmissionModel } from './auth.interface';

const AdmissionSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    nickName: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true },
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


const OnlineAppointmentSchema = new Schema({
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
    trim: true
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
}, {
  timestamps: true,
});




export const OnlineAppointment = model('OnlineAppointment', OnlineAppointmentSchema);
export const Admission = model<IAdmission, IAdmissionModel>('Admission', AdmissionSchema);
