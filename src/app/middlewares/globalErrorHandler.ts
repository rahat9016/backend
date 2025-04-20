/* eslint-disable no-unused-expressions */
/* eslint-disable no-undefined */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
// import { errorlogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // config.env === 'development'
  //   ? console.log('globalErrorHandler ~', error)
  //   : errorlogger.error('globalErrorHandler ~', error);

  console.log('globalErrorHandler ~', error);
  // console.log("error?.name", error?.name)
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  // * Validation error handling
  if (error?.name === 'MongoServerError') {
    const duplicateField = Object.keys(error.keyValue)[0];
    const duplicateValue = error.keyValue[duplicateField];
    statusCode = 409; // Conflict
    message = `${duplicateValue}" already exists.`;
    errorMessages = [
      {
        path: duplicateField,
        message: `${duplicateField} "${duplicateValue}" already exists.`,
      },
    ];
  }
  else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // * Zod error handling
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // * Cast error handling
  else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  // * Api error handling
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // * Other error handling
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } 

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;

// const globalErrorHandler = () => {
//   console.log('errorHandler called')
// }

// export default globalErrorHandler
