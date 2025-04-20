/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

// types/category.ts
export type ICategory = {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}



export type ICategoryModel = Model<ICategory, Record<string, unknown>>;

export type IPaginationAdmission = {
  data: ICategory[];
  total: number;
};