import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { IAdmission } from './auth.interface';
import { AdmissionService } from './admission.service';
import { calculatePaginationOptions } from '../../util/paginationHelper';

const studentAdmission = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await AdmissionService.studentAdmission(req.body);
  sendResponse<IAdmission>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Application submitted successfully. ',
    data: result,
  });
});

const studentAdmissionList = asyncHandler(
  async (req: Request, res: Response) => {
    const current_page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (current_page - 1) * limit;
    const result = await AdmissionService.getAllStudentAdmission(skip, limit);
    const { total_page, previous_page, next_page } = calculatePaginationOptions(
      {
        current_page,
        limit,
        total: result?.total,
      }
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission fetched successfully!',
      data: result?.data,
      meta: {
        current_page,
        limit,
        total_page,
        previous_page,
        next_page,
        total_data: result?.total,
      },
    });
  }
);

export const AdmissionController = {
  studentAdmission,
  studentAdmissionList,
};
