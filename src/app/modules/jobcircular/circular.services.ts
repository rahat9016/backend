import { ICircular, PaginationCircular } from './circular.interface';
import { Circular } from './circular.models';

const createCircular = async (
  payload: ICircular
): Promise<ICircular | null> => {
  const result = await Circular.create(payload);
  return result;
};

const getAllCircular = async (
  skip: number,
  limit: number
): Promise<PaginationCircular | null> => {
  const result = await Circular.find()
    .skip(skip)
    .limit(limit)
    .lean()
    .sort({ createdAt: -1 })
    .select('_id title description location deadline position salary active');
  const total = await Circular.countDocuments();
  return { data: result, total };
};

const getSingleCircular = async (id: string): Promise<ICircular | null> => {
  const result = await Circular.findById(id).select("_id title description location deadline position salary");
  return result;
};

const getClientCircular = async (): Promise<ICircular[] | null> => {
  const currentDate = new Date();
  const result = await Circular.find({
    deadline: { $gte: currentDate },
    active: true,
  })
    .lean()
    .select('_id title description location deadline position salary')
    .sort({ createdAt: -1 });

  return result;
};

const updateCircular = async (
  id: string,
  updatedData: Partial<ICircular>
): Promise<ICircular | null> => {
  const result = await Circular.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const CircularService = {
  createCircular,
  getAllCircular,
  getClientCircular,
  updateCircular,
  getSingleCircular,
};
