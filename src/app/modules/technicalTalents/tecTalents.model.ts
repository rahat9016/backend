import { Schema, model } from 'mongoose';
import { ITecTalents, tecTalentsModel } from './tecTalents.interface';

const tecTalentsSchema = new Schema<ITecTalents>(
  {
    companyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    noOfVacancy: {
      type: String,
    },
    project: {
      type: String,
    },
    skillRequirements: {
      type: String,
    },
    softwareSkills: {
      type: String,
    },
    additional: {
      type: String,
    },
    responsibilities: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const TecTalents = model<ITecTalents, tecTalentsModel>(
  'TecTalents',
  tecTalentsSchema
);
