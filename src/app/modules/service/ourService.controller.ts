import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { IOurService } from './ourService.interface';
import { OurServiceService } from './ourService.service';

// ? Create Our Service

const createOurService = asyncHandler(async (req: Request, res: Response) => {
  const { ...ourServiceData } = req.body;
  const result = await OurServiceService.createService(ourServiceData);

  sendResponse<IOurService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Our services created successfully!',
    data: result,
  });
});

// ? Get all Services

const getOurService = asyncHandler(async (req: Request, res: Response) => {
  const result = await OurServiceService.getAllService();

  sendResponse<IOurService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Our services retrieved successfully!',
    data: result,
  });
});

// ? Get all active Services

const getActiveService = asyncHandler(async (req: Request, res: Response) => {
  const result = await OurServiceService.getActiveService();

  sendResponse<IOurService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active services retrieved successfully!',
    data: result,
  });
});

// ? Update Our Service

const updateOurService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...ourServiceData } = req.body;
  const result = await OurServiceService.updateService(id, ourServiceData);

  sendResponse<IOurService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Our service updated successfully!',
    data: result,
  });
});

export const ourServiceController = {
  createOurService,
  getOurService,
  getActiveService,
  updateOurService,
};
