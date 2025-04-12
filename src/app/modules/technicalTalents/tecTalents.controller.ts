import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ITecTalents } from './tecTalents.interface';
import { TecTalentsService } from './tecTalents.service';

const createTecTalents = asyncHandler(async (req: Request, res: Response) => {
  const { ...tecTalentsData } = req.body;
  const result = await TecTalentsService.createTecTalents(tecTalentsData);

  sendResponse<ITecTalents>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technical talents created successfully!',
    data: result,
  });
});

export const tecTalentsController = {
  createTecTalents,
};
