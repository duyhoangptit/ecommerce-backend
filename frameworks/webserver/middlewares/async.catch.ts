'use strict';

import { NextFunction, Request, Response } from 'express';

export const asyncHandler =
   (fn) => (req: Request, res: Response, next: NextFunction) => {
      return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
   };
