import { Model } from 'mongoose';

export type IOurService = {
  title: string;
  image: string;
  description: string;
  activeStatus: boolean;
};

export type ourServiceModel = Model<IOurService, Record<string, unknown>>;
