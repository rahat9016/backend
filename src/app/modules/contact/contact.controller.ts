import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { IContact } from './contact.interface';
import { ContactService } from './contact.service';
import { calculatePaginationOptions } from '../../util/paginationHelper';

const createContact = asyncHandler(async (req: Request, res: Response) => {
  const { ...careerData } = req.body;
  const result = await ContactService.createContact(careerData);

  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact created successfully!',
    data: result,
  });
});

const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const current_page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (current_page - 1) * limit;
  // *** Function call from the services to get all contact
  const result = await ContactService.getAllContact(skip, limit);

  const { total_page, previous_page, next_page } = calculatePaginationOptions({
    current_page,
    limit,
    total: result?.total,
  });
  sendResponse<IContact[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contacts fetched successfully!',
    data: result?.data,
    meta: {
      current_page,
      limit,
      total_page,
      previous_page,
      next_page,
      total_data: result?.total,
    },
  });
});

export const ContactController = {
  createContact,
  getContacts,
};
