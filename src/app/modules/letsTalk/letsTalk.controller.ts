import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ILetsTalk } from './letsTalk.interface';
import { LetsTalkService } from './letsTalk.service';

const createLetsTalk = asyncHandler(async (req: Request, res: Response) => {
  const { ...letsTalkData } = req.body;

  console.log('letsTalkData', letsTalkData);

  const result = await LetsTalkService.createLetsTalk(letsTalkData);

  sendResponse<ILetsTalk>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career created successfully!',
    data: result,
  });
});

export const LetsTalkController = {
  createLetsTalk,
};
