/* eslint-disable no-extra-boolean-cast */
import path from 'path';
import fs from 'fs';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IMediaGallery,
  PaginationGalleryLibraryGroup,
  PaginationMediaGallery,
} from './mediaLibary.interface';
import { Request } from 'express';
import { GalleryLibrary, MediaGalleryLibrary } from './mediaLibrary.model';
import mongoose from 'mongoose';
import Category from '../group/group.model';

const uploadImages = async (req: Request): Promise<IMediaGallery[] | null> => {
  // eslint-disable-next-line no-undef
  const files = req.files as Express.Multer.File[];
  const names = req.body.names;
  if (!files || files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No files uploaded');
  }
  const normalizedNames = Array.isArray(names) ? names : [names];

  const mediaItems = files.map((file, index) => {
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
      filename: normalizedNames[index] || file.originalname,
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
  req: Request,
  skip: number,
  limit: number
): Promise<PaginationMediaGallery | null> => {
  const result = await MediaGalleryLibrary.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const response = result.map(media => {
    return {
      filename: media.filename,
      image: `${baseUrl}/${media.image}`,
      fileType: media.fileType,
      _id: media._id,
      uploadDate: media.updatedAt,
    };
  });
  const total = await MediaGalleryLibrary.countDocuments();
  return { data: response, total };
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

const uploadImagesFromGallery = async (req: Request) => {
  try {
    const { images, categoryId } = req.body;

    const validCategoryId = await Category.countDocuments({
      _id: { $in: categoryId },
    });
    if (!validCategoryId) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid category id, doesn't exist in Database. Please provide valid category ID."
      );
    }

    const existingGallery = await GalleryLibrary.findOne({
      categoryId: new mongoose.Types.ObjectId(categoryId),
    });
    // If category id not exist so we can insert new item in gallery
    if (!existingGallery) {
      const newGallery = new GalleryLibrary({ images, categoryId });
      return await newGallery.save();
    }
    const existingImgIds = existingGallery.images.map(item =>
      item.imgId.toString()
    );

    const newImages = images.filter(
      (item: { imgId: string }) => !existingImgIds.includes(item.imgId)
    );

    if (newImages.length) {
      existingGallery.images.push(...newImages);
      return await existingGallery.save();
    }
    return existingGallery;
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getImagesFromGallery = async (
  skip: number,
  limit: number
): Promise<PaginationGalleryLibraryGroup | null> => {
  const result = await GalleryLibrary.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 })
    .populate('categoryId');

  const total = await GalleryLibrary.countDocuments();
  return { data: result, total };
};

export const MediaService = {
  uploadImages,
  getUploadImages,
  deleteAllImages,
  uploadImagesFromGallery,
  getImagesFromGallery,
};
