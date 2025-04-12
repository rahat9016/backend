import { Types } from 'mongoose';
import { Model } from 'mongoose';

export type ICareer = {
  circularId: Types.ObjectId;
  circularTitle: string;
  name: string;
  address: string;
  email: string;
  experience: string;
  position: string;
  skills: string;
  resume: string[];
};

export type PaginationCareer = {
  data: ICareer[];
  total: number;
};

export type careerModel = Model<ICareer, Record<string, unknown>>;
