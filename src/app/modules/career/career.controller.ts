/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ICareer } from './career.interface';
import { CareerService } from './career.service';
import { calculatePaginationOptions } from '../../util/paginationHelper';

const createCareer = asyncHandler(async (req: Request, res: Response) => {
  const { ...careerData } = req.body;

  // * Extract relative paths for images
  const imagePaths = req.files
    ? (req.files as Express.Multer.File[]).map(file => {
        // * Remove everything before and including `public/` in the file path
        const relativePath = file.path.split('public')[1];
        // * Ensure it uses forward slashes
        return relativePath.replace(/\\/g, '/').replace(/^\//, ''); // Remove leading slash
      })
    : [];

  const result = await CareerService.createCareer(careerData, imagePaths);

  sendResponse<ICareer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career created successfully!',
    data: result,
  });
});

const getCareers = asyncHandler(async (req: Request, res: Response) => {
  const current_page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (current_page - 1) * limit;
  const result = await CareerService.getAllCareer(skip, limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No careers found');
  }

  // * Add domain name to each image path

  const domain = `${req.protocol}://${req.get('host')}`;
  const updatedResult = result.data.map(career => {
    const updatedCareer = career;
    updatedCareer.resume = updatedCareer.resume.map(
      imagePath => `${domain}/${imagePath}`
    );
    return updatedCareer;
  });

  const { total_page, previous_page, next_page } = calculatePaginationOptions({
    current_page,
    limit,
    total: result.total,
  });

  sendResponse<ICareer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career fetched successfully!',
    data: updatedResult,
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

export const careerController = {
  createCareer,
  getCareers,
};
