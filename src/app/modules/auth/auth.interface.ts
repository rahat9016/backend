/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export type IAuth = {
    fullName: string;
    email: string;
    profile: string;
    description: string;
    contact: string;
    jobTitle: string;
    address?: string;
    activeStatus: boolean;
    role: 'admin' | 'user';
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
} & Document;

export type IAuthModel = Model<IAuth, Record<string, unknown>>;


export type PaginationUser = {
  data: IAuth[];
  total: number;
};