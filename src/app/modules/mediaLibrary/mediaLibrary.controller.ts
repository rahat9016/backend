import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import ApiError from '../../../errors/ApiError';
import { MediaGalleryLibrary } from './mediaLibary.model';


const uploadGalleryMedia = asyncHandler(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-undef
  const file = req.file as Express.Multer.File;

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  }
  if(!req.body.filename){
    throw new ApiError(httpStatus.BAD_REQUEST, 'File name is required');
  }
  const path = file.path.split('public')[1]?.replace(/\\/g, '/').replace(/^\//, '');

  const mimeType = file.mimetype;
  let fileType: 'image' | 'video' | 'other' = 'other';

  if (mimeType.startsWith('image')) {
    fileType = 'image';
  } else if (mimeType.startsWith('video')) {
    fileType = 'video';
  }

  const media = await MediaGalleryLibrary.create({
    filename: req.body.filename,
    image: path,
    fileType,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'File uploaded successfully!',
    data: media,
  });
});


const getGalleryMedia = asyncHandler(async (req: Request, res: Response) => {
  const mediaList = await MediaGalleryLibrary.find().sort({ uploadDate: -1 });

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const updatedMediaList = mediaList.map(media => ({
    ...media.toObject(),
    image: `${baseUrl}/${media.image}`,
  }));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Media list retrieved successfully!',
    data: updatedMediaList,
  });
});

export const MediaLibraryController = {
  uploadGalleryMedia,
  getGalleryMedia
};
