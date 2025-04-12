import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';

export type IAuthenticatedRequest = {
  user?: JwtPayload | string;
} & Request;

const authenticate = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }
  // token split
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: 'Expired token',
    });
  }
};

export default authenticate;
