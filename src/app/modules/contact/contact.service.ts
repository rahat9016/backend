// ? Create Service
import { IContact, PaginationContacts } from './contact.interface';
import { Contact } from './contact.model';

const createContact = async (payload: IContact): Promise<IContact | null> => {
  const result = await Contact.create(payload);
  return result;
};

// ? Get all Contact

const getAllContact = async (
  skip: number,
  limit: number
): Promise<PaginationContacts | null> => {
  const result = await Contact.find()
    .skip(skip)
    .limit(limit)
    .select("_id name phone email message")
    .lean()
    .sort({ createdAt: -1 });
  const total = await Contact.countDocuments();
  return { data: result, total };
};

// const getAllService = async (): Promise<IOurService[] | null> => {
//   const result = await OurService.find();
//   return result;
// };
// ? Get active Contact

const getActiveContact = async (): Promise<IContact[] | null> => {
  const result = await Contact.find({ activeStatus: true });
  return result;
};

// ? Update Contact

const updateContact = async (
  id: string,
  payload: Partial<IContact>
): Promise<IContact | null> => {
  const result = await Contact.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ContactService = {
  createContact,
  getAllContact,
  getActiveContact,
  updateContact,
};
