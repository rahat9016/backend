import path from 'path';
import fs from 'fs';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMediaGallery, PaginationMediaGallery } from './mediaLibary.interface';
import { Request } from 'express';
import { MediaGalleryLibrary } from './mediaLibrary.model';
const uploadImages = async (req: Request): Promise<IMediaGallery[] | null> => {
  // eslint-disable-next-line no-undef
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No files uploaded');
  }

  const mediaItems = files.map(file => {
    const path = file.path
      .split('public')[1]
      ?.replace(/\\/g, '/')
      .replace(/^\//, '');
    const mimeType = file.mimetype;
    let fileType: 'image' | 'video' | 'other' = 'image';

    if (mimeType.startsWith('image')) {
      fileType = 'image';
    } else if (mimeType.startsWith('video')) {
      fileType = 'video';
    }

    return {
      filename: file.originalname,
      image: path,
      fileType,
    };
  });

  const createdMedia = await MediaGalleryLibrary.insertMany(mediaItems);
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const response = createdMedia.map(media => {
    return {
      filename: media.filename,
      image: `${baseUrl}/${media.image}`,
      fileType: media.fileType,
      _id: media._id,
      uploadDate: media.updatedAt,
    };
  });
  return response;
};

const getUploadImages = async (
  skip: number,
  limit: number
): Promise<PaginationMediaGallery | null> => {
  const result = await MediaGalleryLibrary.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });

  const total = await MediaGalleryLibrary.countDocuments();
  return { data: result, total };
};

const deleteAllImages = async () => {
  const allMedia = await MediaGalleryLibrary.find();

  if (!allMedia || allMedia.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No media found to delete');
  }
  allMedia.forEach(media => {
    const filePath = path.join(__dirname, '../../../../public', media.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
  const response = await MediaGalleryLibrary.deleteMany({});
  return response;
};
export const MediaService = {
  uploadImages,
  getUploadImages,
  deleteAllImages,
};
