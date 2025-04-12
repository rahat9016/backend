import { Model } from 'mongoose';

export type ILetsTalk = {
  companyName: string;
  address: string;
  country: string;
  project: string;
  additional: string;
  responsibilities: string;
  vacancy: number;
  softwareSkill: string;
  skillRequirement: string;
};

export type LetsTalkModel = Model<ILetsTalk, Record<string, unknown>>;
