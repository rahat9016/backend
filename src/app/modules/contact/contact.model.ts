import { Schema, model } from 'mongoose';
import { IContact, contactModel } from './contact.interface';

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = model<IContact, contactModel>('Contact', contactSchema);
