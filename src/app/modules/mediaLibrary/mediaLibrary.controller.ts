import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { MediaService } from './mediaLibrary.service';
import { calculatePaginationOptions } from '../../util/paginationHelper';

const uploadGalleryMedia = asyncHandler(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-undef
  const response = await MediaService.uploadImages(req)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'File uploaded successfully!',
    data: response,
  });
});

const deleteAllImages = asyncHandler(async (req: Request, res: Response) => {
  const response = await MediaService.deleteAllImages()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Media deleted successfully!',
    data: response
  });
});

const getGalleryMedia = asyncHandler(async (req: Request, res: Response) => {
  const current_page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (current_page - 1) * limit;
  const result = await MediaService.getUploadImages(skip, limit);
  const { total_page, previous_page, next_page } = calculatePaginationOptions({
    current_page,
    limit,
    total: result?.total,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Media fetched successfully!',
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

export const MediaLibraryController = {
  uploadGalleryMedia,
  getGalleryMedia,
  deleteAllImages
};
