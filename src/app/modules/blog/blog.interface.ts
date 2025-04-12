import { Model } from 'mongoose';

export type IBlog = {
  topic: string;
  title: string;
  image: string;
  description: string;
  author: string;
  date: string;
  activeStatus: boolean;
};

export type BlogModel = Model<IBlog, Record<string, unknown>>;
