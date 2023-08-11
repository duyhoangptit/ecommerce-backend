'use strict';

import { IRequest } from '../../config/interfaces/express.interface';
import { NextFunction, Response } from 'express';
import { CREATED } from '../../frameworks/webserver/middlewares/success.response';
import createDiscount from '../../application/use_cases/discount/create';

export default function discountController(discountDbRepo, discountDbRepoImpl) {
   const discountDb = discountDbRepo(discountDbRepoImpl());
   const createNewDiscount = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Create discount successfully',
         metadata: await createDiscount(discountDb, {
            ...req.body,
            shopId: req.user.userId,
         }),
      });
   };

   return {
      createNewDiscount,
   };
}
