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


export type IAdmissionModel = Model<IAdmission, Record<string, unknown>>;


export type IPaginationAdmission = {
  data: IAdmission[];
  total: number;
};