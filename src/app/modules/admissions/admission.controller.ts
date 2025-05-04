import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import {
  // IAdmission,
  IAppointment,
  // IFAQ,
  IFeedback,
  IPreRegister,
  ISchoolTourBooking,
} from './auth.interface';
import { AdmissionService } from './admission.service';
import { calculatePaginationOptions } from '../../util/paginationHelper';

import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';


const studentAdmission = asyncHandler(async (req: Request, res: Response) => {
  const result = await AdmissionService.studentAdmission(req.body);

  if (result) {
    // const htmlContent = `
    //    <div style="font-family: Arial, sans-serif; color: #000;">
    //      <div style="background-color: #11265e; color: white; padding: 20px; text-align: center;">
    //      <img src="https://backend-beryl-sigma-47.vercel.app/logo.png" />
    //        <h1>Pan-Asia International School</h1>
    //        <h2>Enrollment Form</h2>
    //      </div>
    //      <h3 style="background-color: #11265e; color: white; padding: 10px;">Student Information</h3>
    //      <table style="width: 100%;">
    //        <tr><td>First Name:</td><td>${req.body.firstName}</td></tr>
    //        <tr><td>Middle Name:</td><td>${req.body.middleName}</td></tr>
    //        <tr><td>Last Name:</td><td>${req.body.lastName}</td></tr>
    //        <tr><td>Nick Name:</td><td>${req.body.nickName}</td></tr>
    //        <tr><td>Gender:</td><td>${req.body.gender}</td></tr>
    //        <tr><td>Nationality:</td><td>${req.body.nationality}</td></tr>
    //        <tr><td>Phone:</td><td>${req.body.phone}</td></tr>
    //        <tr><td>Email:</td><td>${req.body.email}</td></tr>
    //        <tr><td>Address:</td><td>${req.body.address}</td></tr>
    //        <tr><td>Grade Applying For:</td><td>${
    //          req.body.gradeApplyingFor
    //        }</td></tr>
    //        <tr><td>Year Applying For:</td><td>${
    //          req.body.yearApplyingFor
    //        }</td></tr>
    //        <tr><td>Current School Name:</td><td>${
    //          req.body.currentSchoolName
    //        }</td></tr>
    //      </table>
    //      <h3 style="background-color: #11265e; color: white; padding: 10px;">Parent/Guardian Information</h3>
    //      <table style="width: 100%;">
    //        <tr><td>First Name:</td><td>${req.body.parentFirstName}</td></tr>
    //        <tr><td>Middle Name:</td><td>${req.body.parentMiddleName}</td></tr>
    //        <tr><td>Last Name:</td><td>${req.body.parentLastName}</td></tr>
    //        <tr><td>Relation:</td><td>${req.body.relation}</td></tr>
    //        <tr><td>Nationality:</td><td>${req.body.parentNationality}</td></tr>
    //        <tr><td>Phone:</td><td>${req.body.parentPhone}</td></tr>
    //        <tr><td>Email:</td><td>${req.body.parentEmail}</td></tr>
    //        <tr><td>Address:</td><td>${req.body.parentAddress}</td></tr>
    //      </table>
    //      <h3 style="background-color: #11265e; color: white; padding: 10px;">Additional Information</h3>
    //      <p><strong>Where did you hear from our school?</strong> ${
    //        req.body.comments || ''
    //      }</p>
    //      <p style="text-align: right; margin-top: 40px;"><strong>Authorized’s Signature</strong></p>
    //    </div>
    //  `;
     const publicDir = path.join(process.cwd(), 'public');
     if (!fs.existsSync(publicDir)) {
       fs.mkdirSync(publicDir);
     }
     const pdfPath = path.join(publicDir, 'enrollment-form.pdf');

     const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));

    doc
      .fontSize(20)
      .fillColor('#11265e')
      .text('Pan-Asia International School', { align: 'center' });
    doc
      .fontSize(16)
      .fillColor('#000')
      .text('Enrollment Form', { align: 'center' })
      .moveDown();

    doc
      .fontSize(14)
      .fillColor('#11265e')
      .text('Student Information', { underline: true });

    doc.fontSize(12).fillColor('black').text(`First Name: ${req.body.firstName}`);
    doc.text(`Middle Name: ${req.body.middleName}`);
    doc.text(`Last Name: ${req.body.lastName}`);
    doc.text(`Nick Name: ${req.body.nickName}`);
    doc.text(`Gender: ${req.body.gender}`);
    doc.text(`Nationality: ${req.body.nationality}`);
    doc.text(`Phone: ${req.body.phone}`);
    doc.text(`Email: ${req.body.email}`);
    doc.text(`Address: ${req.body.address}`);
    doc.text(`Grade Applying For: ${req.body.gradeApplyingFor}`);
    doc.text(`Year Applying For: ${req.body.yearApplyingFor}`);
    doc.text(`Current School Name: ${req.body.currentSchoolName}`);

    doc.moveDown().fontSize(14).fillColor('#11265e').text('Parent/Guardian Information', { underline: true });

    doc.fontSize(12).fillColor('black').text(`First Name: ${req.body.parentFirstName}`);
    doc.text(`Middle Name: ${req.body.parentMiddleName}`);
    doc.text(`Last Name: ${req.body.parentLastName}`);
    doc.text(`Relation: ${req.body.relation}`);
    doc.text(`Nationality: ${req.body.parentNationality}`);
    doc.text(`Phone: ${req.body.parentPhone}`);
    doc.text(`Email: ${req.body.parentEmail}`);
    doc.text(`Address: ${req.body.parentAddress}`);

    doc.moveDown().fontSize(14).fillColor('#11265e').text('Additional Information', { underline: true });

    doc.fontSize(12).fillColor('black').text(`How did you hear about us? ${req.body.comments || ''}`);

    doc.moveDown().text('Authorized’s Signature __________________________', { align: 'right' });

    doc.end();

    // Wait for PDF to finish writing
    await new Promise(resolve => {
      doc.on('finish', resolve);
    });
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'rahat.official.info9016@gmail.com',
        pass: 'taek xkwg qtam ruwf',
      },
      tls: { rejectUnauthorized: true },
    });

    await transport.sendMail({
      from: 'rahat.official.info9016@gmail.com',
      to: 'rahat.official.info9016@gmail.com, minhajurrohoman9016@gmail.com',
      subject: 'Enrollment Form Submission',
      text: 'Please find the attached enrollment form PDF.',
      // html: htmlContent,
      attachments: [
        {
          filename: 'enrollment-form.pdf',
          path: pdfPath,
          contentType: 'application/pdf',
        },
      ],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Application submitted successfully.',
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
