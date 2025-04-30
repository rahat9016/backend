import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
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

const studentAdmission = asyncHandler(async (req: Request, res: Response) => {
  // create user
  const result = await AdmissionService.studentAdmission(req.body);
  if (result) {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'rahat.official.info9016@gmail.com',
        pass: 'taek xkwg qtam ruwf',
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #000;">
        <div style="background-color: #11265e; color: white; padding: 20px; display: flex; align-items:center; justify-between">
        <img src="https://backend-beryl-sigma-47.vercel.app/logo.png" width="64px" height="64px" />
          <h1>Pan-Asia International School</h1>
          <h2>Enrollment Form</h2>
          <div style="width: 56px; height: 64px ></div>
        </div>
        <h3 style="background-color: #11265e; color: white; padding: 10px;">Student Information</h3>
        <table style="width: 100%;">
          <tr><td>First Name:</td><td>${req.body.firstName}</td></tr>
          <tr><td>Middle Name:</td><td>${req.body.middleName}</td></tr>
          <tr><td>Last Name:</td><td>${req.body.lastName}</td></tr>
          <tr><td>Nick Name:</td><td>${req.body.nickName}</td></tr>
          <tr><td>Gender:</td><td>${req.body.gender}</td></tr>
          <tr><td>Nationality:</td><td>${req.body.nationality}</td></tr>
          <tr><td>Phone:</td><td>${req.body.phone}</td></tr>
          <tr><td>Email:</td><td>${req.body.email}</td></tr>
          <tr><td>Address:</td><td>${req.body.address}</td></tr>
          <tr><td>Grade Applying For:</td><td>${req.body.grade}</td></tr>
          <tr><td>Year Applying For:</td><td>${req.body.year}</td></tr>
          <tr><td>Current School Name:</td><td>${
            req.body.currentSchool
          }</td></tr>
        </table>
        <h3 style="background-color: #11265e; color: white; padding: 10px;">Parent/Guardian Information</h3>
        <table style="width: 100%;">
          <tr><td>First Name:</td><td>${req.body.parentFirstName}</td></tr>
          <tr><td>Middle Name:</td><td>${req.body.parentMiddleName}</td></tr>
          <tr><td>Last Name:</td><td>${req.body.parentLastName}</td></tr>
          <tr><td>Relation:</td><td>${req.body.relation}</td></tr>
          <tr><td>Nationality:</td><td>${req.body.parentNationality}</td></tr>
          <tr><td>Phone:</td><td>${req.body.parentPhone}</td></tr>
          <tr><td>Email:</td><td>${req.body.parentEmail}</td></tr>
          <tr><td>Address:</td><td>${req.body.parentAddress}</td></tr>
        </table>
        <h3 style="background-color: #11265e; color: white; padding: 10px;">Additional Information</h3>
        <p><strong>Where did you hear from our school?</strong> ${
          req.body.heardFrom || ''
        }</p>
        <p style="text-align: right; margin-top: 40px;"><strong>Authorized’s Signature</strong></p>
      </div>
    `;
    await transport.sendMail({
      from: 'rahat.official.info9016@gmail.com',
      to: 'rahat.official.info9016@gmail.com',
      subject: 'Application for Admission',
      html: htmlContent,
    });
  }
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
  const result = await AdmissionService.faq(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Submitted successfully. ',
    data: result,
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
