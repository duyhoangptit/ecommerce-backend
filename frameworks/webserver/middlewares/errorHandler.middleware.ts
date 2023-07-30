'use strict';

import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {
   Api401Error,
   Api403Error,
   Api404Error,
   Api409Error,
   BaseError,
   BusinessLogicError,
} from './error.response';

const returnError = (
   err: BaseError | any,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const statusCode = err.status || 500;
   let error;
   if (err instanceof BaseError) {
      error = { ...err };
      error.message = err.message;
   } else {
      error = { ...err };
      error.message = err.message;
      if (err.name === 'CastError') error = handleCastErrorDB(err);
      if (err.code === 11000) error = handleDuplicateFieldsDB(err);
      if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
      if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
      if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(err);
   }

   return res.status(statusCode).json({
      status: statusCode,
      message: error.message ? error.message : 'Internal Server Error',
      errors: error.errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : '',
   });
};

const isOperationalError = (err: BaseError): boolean => {
   if (err instanceof BaseError) {
      return err.isOperational;
   }
   return false;
};
const is404Handler = (req: Request, res: Response, next: NextFunction) => {
   const err = new Api404Error('Resource not found');
   next(err);
};

// Error Database
const handleCastErrorDB = (err) => {
   const message = `Invalid ${err.path}: ${err.value}`;
   return new BusinessLogicError(message);
};
const handleDuplicateFieldsDB = (err) => {
   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
   console.log(value);
   const message = `Duplicate field value: ${value}. Please use another value`;
   return new BusinessLogicError(message);
};
const handleValidationErrorDB = (err) => {
   const errors = Object.values(err.errors).map((el: BaseError) => el.message);
   console.log(errors);
   const message = `Invalid input data. ${errors.join('. ')}`;
   return new BusinessLogicError(message);
};

// Error JWT validation
const handleJWTError = (err) => {
   console.error(err);
   const message = `Invalid token. Please login again`;
   return new Api401Error(message);
};
const handleJWTExpiredError = (err) => {
   console.error(err);
   const message = `Your token has expired. Please login again`;
   return new Api403Error(message);
};

export { returnError, isOperationalError, is404Handler };
