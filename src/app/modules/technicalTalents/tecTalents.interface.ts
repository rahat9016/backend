import { Model } from 'mongoose';

export type ITecTalents = {
  companyName: string;
  address: string;
  country: string;
  noOfVacancy: string;
  project: string;
  skillRequirements: string;
  softwareSkills: string;
  additional: string;
  responsibilities: string;
};

export type tecTalentsModel = Model<ITecTalents, Record<string, unknown>>;
