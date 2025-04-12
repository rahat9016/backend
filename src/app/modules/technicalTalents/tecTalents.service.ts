// ? Create Service

import { ITecTalents } from './tecTalents.interface';
import { TecTalents } from './tecTalents.model';

const createTecTalents = async (
  payload: ITecTalents
): Promise<ITecTalents | null> => {
  const result = await TecTalents.create(payload);
  return result;
};

// ? Get all TecTalents

const getAllTecTalents = async (): Promise<ITecTalents[] | null> => {
  const result = await TecTalents.find();
  return result;
};

// ? Get active TecTalents

const getActiveTecTalents = async (): Promise<ITecTalents[] | null> => {
  const result = await TecTalents.find({ activeStatus: true });
  return result;
};

// ? Update TecTalents

const updateTecTalents = async (
  id: string,
  payload: Partial<ITecTalents>
): Promise<ITecTalents | null> => {
  const result = await TecTalents.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const TecTalentsService = {
  createTecTalents,
  getAllTecTalents,
  getActiveTecTalents,
  updateTecTalents,
};
