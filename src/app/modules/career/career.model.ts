import { Schema, model } from 'mongoose';
import { ICareer, careerModel } from './career.interface';

const careerSchema = new Schema<ICareer>(
  {
    circularId: {
      type: Schema.Types.ObjectId,
      ref: 'Circular',
      required: true,
    },
    circularTitle: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    resume: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Career = model<ICareer, careerModel>('Career', careerSchema);
