import { Model } from 'mongoose';

export type IContact = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type PaginationContacts = {
  data: IContact[];
  total: number;
};

export type contactModel = Model<IContact, Record<string, unknown>>;
