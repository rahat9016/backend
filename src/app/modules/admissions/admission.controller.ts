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
import ejs from 'ejs';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

import config from '../../../config';

const studentAdmission = asyncHandler(async (req: Request, res: Response) => {
  const result = await AdmissionService.studentAdmission(req.body);

  if (result) {
    const templatePath = path.join(
      __dirname,
      '../../../views/',
      'enrollment-form.ejs'
    );
    const html = await new Promise<string>((resolve, reject) => {
      ejs.renderFile(templatePath, { data: result }, (error, html) => {
        if (error) reject(error);
        else resolve(html);
      });
    });

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true,
    });
    await browser.close();

    // Send email with attachment
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, //465 live port,
      secure: true, // true,
      logger: true,
      debug: true,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
      tls: { rejectUnauthorized: false },
    });

    await transport.sendMail({
      from: 'rahat.official.info9016@gmail.com',
      to: 'rahat.official.info9016@gmail.com, minhajurrohoman9016@gmail.com',
      subject: 'Enrollment Form Submission',
      text: 'Please find the attached enrollment form PDF.',
      attachments: [
        {
          filename: 'enrollment-form.pdf',
          content: Buffer.from(pdfBuffer),
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
