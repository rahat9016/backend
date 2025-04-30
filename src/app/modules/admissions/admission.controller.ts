import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import {
  IAdmission,
  IAppointment,
  // IFAQ,
  IFeedback,
  IPreRegister,
  ISchoolTourBooking,
} from './auth.interface';
import { AdmissionService } from './admission.service';
import { calculatePaginationOptions } from '../../util/paginationHelper';
import nodemailer from 'nodemailer';
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

const onlineAppointment = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await AdmissionService.OnlineAppointment(req.body);
  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Submitted successfully. ',
    data: result,
  });
});

const schoolTourBooking = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await AdmissionService.schoolTourBooking(req.body);
  sendResponse<ISchoolTourBooking>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Submitted successfully. ',
    data: result,
  });
});

const preRegister = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await AdmissionService.preRegister(req.body);
  sendResponse<IPreRegister>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Submitted successfully. ',
    data: result,
  });
});

const feedback = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await AdmissionService.feedback(req.body);
  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Submitted successfully. ',
    data: result,
  });
});

const faq = asyncHandler(async (req: Request, res: Response) => {
  // create user
  // const result = await AdmissionService.faq(req.body);

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'rahat.official.info9016@gmail.com',
      pass: 'lahi skht pagg evbz',
    },
    secure: true
  });

  const info = await transport.sendMail({
    from: 'rahat.official.info9016@gmail.com',
    to: 'rahat.official.info9016@gmail.com', 
    subject: 'Hello ✔', 
    text: 'Hello world?', 
    html: '<b>Hello world?</b>', 
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Submitted successfully. ',
    data: info,
  });
});

export const AdmissionController = {
  studentAdmission,
  studentAdmissionList,
  onlineAppointment,
  schoolTourBooking,
  preRegister,
  feedback,
  faq,
};
