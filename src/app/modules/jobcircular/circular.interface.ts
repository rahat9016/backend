import { Model } from 'mongoose';

export type ICircular = {
  title: string;
  description: string;
  location: string;
  deadline: Date;
  position: string;
  salary: string;
  active?: boolean;
};

export type PaginationCircular = {
  data: ICircular[];
  total: number;
};

export type circularModel = Model<ICircular, Record<string, unknown>>;
