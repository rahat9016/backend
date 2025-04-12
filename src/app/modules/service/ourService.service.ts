import { IOurService } from './ourService.interface';
import { OurService } from './ourService.model';

// ? Create Service

const createService = async (
  payload: IOurService
): Promise<IOurService | null> => {
  const result = await OurService.create(payload);
  return result;
};

// ? Get all Service

const getAllService = async (): Promise<IOurService[] | null> => {
  const result = await OurService.find();
  return result;
};

// ? Get active Service

const getActiveService = async (): Promise<IOurService[] | null> => {
  const result = await OurService.find({ activeStatus: true });
  return result;
};

// ? Update Service

const updateService = async (
  id: string,
  payload: Partial<IOurService>
): Promise<IOurService | null> => {
  const result = await OurService.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const OurServiceService = {
  createService,
  getAllService,
  getActiveService,
  updateService,
};
