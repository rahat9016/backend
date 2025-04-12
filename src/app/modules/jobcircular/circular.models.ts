import { model, Schema } from 'mongoose';
import { circularModel, ICircular } from './circular.interface';

const circularSchema = new Schema<ICircular>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Circular = model<ICircular, circularModel>(
  'Circular',
  circularSchema
);
