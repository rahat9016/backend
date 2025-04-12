import { Schema, model } from 'mongoose';
import { IOurService, ourServiceModel } from './ourService.interface';

const ourServiceSchema = new Schema<IOurService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OurService = model<IOurService, ourServiceModel>(
  'OurService',
  ourServiceSchema
);
