/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IAdmission = {
  // Student Information
  firstName: string;
  middleName?: string;
  lastName: string;
  nickName?: string;
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
  phone?: string;
  email: string;
  address: string;
  gradeApplyingFor: string;
  yearApplyingFor: string;
  currentSchoolName?: string;

  // Parent/Guardian Information
  parentTitle: 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.';
  parentFirstName: string;
  parentMiddleName?: string;
  parentLastName: string;
  parentRelation: 'Father' | 'Mother' | 'Guardian';
  parentNationality: string;
  parentPhone?: string;
  parentEmail: string;
  parentAddress: string;

  // Additional Information
  referralSource?: string;
  comments?: string;

  // Optional Mongoose fields if you're using this interface with Mongoose models
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export type IAppointment = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  gradeLevel: string;
  preferredCallDate: string; // Use Date if you're working directly with Date objects
  preferredCallTime: string;
  subject: string;
  additionalMessage: string;
}

export type ISchoolTourBooking = {
  parentName: string;
  studentName: string;
  studentCurrentSchool: string;
  studentCurrentGrade: string;
  studentBirthDate: string; // Format: YYYY-MM-DD
  schoolTourDate: string;   // Format: YYYY-MM-DD
  preferredTime: string;
  mobileNumber: string;
  email: string;
}
export type IPreRegister = {
  parentName: string;
  parentEmail: string;
  parentContactNumber: string;
  email: string;
  grade: string;
  studentName: string;
  studentGender: 'Male' | 'Female';
  studentDOB: string;
  studentNationality: string;
  currentSchool: string;
}


export type IPreRegisterModel = Model<IPreRegister, Record<string, unknown>>;
export type IAdmissionModel = Model<IAdmission, Record<string, unknown>>;
export type IAppointmentModel = Model<IAppointment, Record<string, unknown>>;
export type ISchoolTourBookingModel = Model<ISchoolTourBooking, Record<string, unknown>>;

export type IPaginationAdmission = {
  data: IAdmission[];
  total: number;
};