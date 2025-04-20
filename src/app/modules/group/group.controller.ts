import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { GroupService } from './group.service';
import { ICategory } from './group.interface';

const categoryCreate = asyncHandler(async (req: Request, res: Response) => {
  const result = await GroupService.categoryCreate(req.body);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully. ',
    data: result,
  });
});

const categoryUpdate = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GroupService.categoryUpdate(id, req.body);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully. ',
    data: result,
  });
});

const categoryList = asyncHandler(async (req: Request, res: Response) => {
  const result = await GroupService.categoryList();
  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully. ',
    data: result,
  });
});

const categoryDelete = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GroupService.categoryDelete(id);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully. ',
    data: result,
  });
});
const categoryGetById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GroupService.categoryFindById(id);
  
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully. ',
    data: result,
  });
});
export const CategoryController = {
  categoryCreate,
  categoryUpdate,
  categoryList,
  categoryDelete,
  categoryGetById
};
