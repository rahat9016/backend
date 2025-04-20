import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { GroupService } from './group.service';
import { ICategory } from './group.interface';

const categoryCreate = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await GroupService.categoryCreate(req.body);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully. ',
    data: result,
  });
});




export const CategoryController = {
  categoryCreate
};
