import { Request, Response } from 'express';
import asyncHandler from '../../../shared/asyncHandler';
import { CircularService } from './circular.services';
import sendResponse from '../../../shared/sendResponse';
import { ICircular } from './circular.interface';
import httpStatus from 'http-status';
import { calculatePaginationOptions } from '../../util/paginationHelper';
import ApiError from '../../../errors/ApiError';

const createCircular = asyncHandler(async (req: Request, res: Response) => {
  const { ...circularData } = req.body;
  const result = await CircularService.createCircular(circularData);

  sendResponse<ICircular>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Circular creates successfully!',
    data: result,
  });
});

const getAllCircular = asyncHandler(async (req: Request, res: Response) => {
  const current_page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (current_page - 1) * limit;
  const result = await CircularService.getAllCircular(skip, limit);
  const { total_page, previous_page, next_page } = calculatePaginationOptions({
    current_page,
    limit,
    total: result?.total,
  });
  sendResponse<ICircular[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Circular fetched successfully!',
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

const getSingleCircular = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CircularService.getSingleCircular(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Circular found');
  }
  sendResponse<ICircular>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched data!',
    data: result,
  });
});

const getAllClientCircular = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CircularService.getClientCircular();
    sendResponse<ICircular[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Circular fetched successfully!',
      data: result,
    });
  }
);

const updateCircular = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...circularData } = req.body;
  const result = await CircularService.updateCircular(id, circularData);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No circular found');
  }
  sendResponse<ICircular>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated data!',
    data: result,
  });

  console.log('result', result);
});

export const CircularController = {
  createCircular,
  getAllCircular,
  getAllClientCircular,
  updateCircular,
  getSingleCircular,
};
