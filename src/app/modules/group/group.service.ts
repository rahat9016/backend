import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICategory } from './group.interface';
import Category from './group.model';

const categoryCreate = async (
  payload: ICategory
): Promise<ICategory | null> => {
  const result = await Category.create(payload);
  return result;
};

const categoryUpdate = async (
  id: string | number,
  payload: ICategory
): Promise<ICategory | null> => {
  const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedCategory;
};
const categoryList = async (): Promise<ICategory[] | null> => {
  const allMedia = await Category.find();
  return allMedia;
};

const categoryDelete = async (id: string): Promise<ICategory | null> => {
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return deletedCategory;
};
const categoryFindById = async (id: string): Promise<ICategory | null> => {
  const categoryById = await Category.findById(id);

  if (!categoryById) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return categoryById;
};
export const GroupService = {
  categoryCreate,
  categoryUpdate,
  categoryList,
  categoryDelete,
  categoryFindById
};
