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
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 20px;">
    <!-- Header Section -->
    <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">Pan-Asia International School</div>
        <div style="font-size: 20px; margin: 10px 0; color: #34495e;">Enrollment Form</div>
    </div>

    <!-- Student Information Section -->
    <div style="margin: 20px 0; padding: 15px; border: 1px solid #bdc3c7; border-radius: 5px;">
        <div style="font-size: 18px; color: #2c3e50; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid #3498db;">
            Student Information
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">First Name</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Mehedi</div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Middle Name</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Hasan</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Last Name</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Khan</div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Nick Name</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Anik</div>
            </div>
        </div>

        <!-- Continue other student fields with same pattern -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Gender</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Male</div>
            </div>
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Nationality</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Thai</div>
            </div>
        </div>

        <!-- Parent/Guardian Section -->
        <div style="margin: 20px 0; padding: 15px; border: 1px solid #bdc3c7; border-radius: 5px;">
            <div style="font-size: 18px; color: #2c3e50; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid #3498db;">
                Parent/Guardian Information
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
                <div style="margin-bottom: 10px;">
                    <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">First Name</div>
                    <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Mehedi</div>
                </div>
                <div style="margin-bottom: 10px;">
                    <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Relation</div>
                    <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">Father</div>
                </div>
            </div>
        </div>

        <!-- Additional Information Section -->
        <div style="margin: 20px 0; padding: 15px; border: 1px solid #bdc3c7; border-radius: 5px;">
            <div style="font-size: 18px; color: #2c3e50; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid #3498db;">
                Additional Information
            </div>
            <div style="margin-bottom: 10px;">
                <div style="display: block; color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">Where did you hear from our school?</div>
                <div style="font-weight: bold; color: #2c3e50; padding: 5px 0; border-bottom: 1px solid #ecf0f1;">
                    I heard about your school from an online search and recommendations from other parents.
                </div>
            </div>
        </div>

        <!-- Signature Section -->
        <div style="text-align: center; padding-top: 40px; border-top: 1px solid #bdc3c7; margin-top: 30px;">
            Authorized’s Signature
        </div>
    </div>
</body>
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
