import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';
import { IAuth } from './auth.interface';
import { calculatePaginationOptions } from '../../util/paginationHelper';
import ApiError from '../../../errors/ApiError';
import nodemailer from 'nodemailer';

const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  // if user email found return email already exist
  const isExist = await Auth.findOne({ email: userData.email });
  if (isExist) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Email Already Registered...',
    });
  }
  // create user
  const user = await AuthService.createUser(userData);

  sendResponse<IAuth>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Register Successful',
    data: user,
  });
});

const signingUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await AuthService.signingUser(
      email,
      password
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Login Successful',
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: error?.message,
    });
  }
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await AuthService.refreshTokens(refreshToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tokens refreshed successfully',
      data: {
        accessToken,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: error?.message,
    });
  }
});

const userList = asyncHandler(async (req: Request, res: Response) => {
  const current_page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (current_page - 1) * limit;
  const result = await AuthService.getAllUser(skip, limit);
  const { total_page, previous_page, next_page } = calculatePaginationOptions({
    current_page,
    limit,
    total: result?.total,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully!',
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
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AuthService.getUserById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Circular found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched data!',
    data: result,
  });
});


const sentEmail = asyncHandler(async (req: Request, res: Response) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      port: 587, 
      auth: {
        user: 'rahat.official.info9016@gmail.com',
        pass: 'xpllfugheanjimxe',
      },
      debug: true,
      logger: true
    });

    const mailOptions = {
      from: 'rahat.official.info9016@gmail.com',
      to: 'minhajurrohoman9016@gmail.com',
      subject: 'testing',
      text: 'text',
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.response);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully fetched data!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send student info email.' });
  }
});
export const AuthController = {
  signupUser,
  signingUser,
  refreshToken,
  userList,
  getUserById,
  sentEmail,
};
