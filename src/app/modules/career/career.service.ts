import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICareer, PaginationCareer } from './career.interface';
import { Career } from './career.model';

// ? Create Service

const createCareer = async (
  payload: ICareer,
  imagePaths: string[]
): Promise<ICareer | null> => {
  if (imagePaths.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one image is required'
    );
  }

  payload.resume = imagePaths;

  const result = await Career.create(payload);
  return result;
};

// ? Get all Career

const getAllCareer = async (
  skip: number,
  limit: number
): Promise<PaginationCareer | null> => {
  const result = await Career.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 });
  const total = await Career.countDocuments();
  return { data: result, total };
};

// ? Get active Career

const getActiveCareer = async (): Promise<ICareer[] | null> => {
  const result = await Career.find({ activeStatus: true });
  return result;
};

// ? Update Career

const updateCareer = async (
  id: string,
  payload: Partial<ICareer>
): Promise<ICareer | null> => {
  const result = await Career.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const CareerService = {
  createCareer,
  getAllCareer,
  getActiveCareer,
  updateCareer,
};
