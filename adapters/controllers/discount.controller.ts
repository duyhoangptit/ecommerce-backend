'use strict';

import { IRequest } from '../../config/interfaces/express.interface';
import { NextFunction, Response } from 'express';
import { CREATED } from '../../frameworks/webserver/middlewares/success.response';
import createDiscount from '../../application/use_cases/discount/create';
import getAllProductsFromDiscount from '../../application/use_cases/discount/getAllProductsFromDiscount';

export default function discountController(
   discountDbRepo,
   discountDbRepoImpl,
   productDbRepo,
   productDbRepoImpl
) {
   const discountDb = discountDbRepo(discountDbRepoImpl());
   const productDb = productDbRepo(productDbRepoImpl());
   const createNewDiscount = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      console.log('req.body', req.body);
      CREATED({
         res,
         message: 'Create discount successfully',
         metadata: await createDiscount(discountDb, {
            ...req.body,
            shopId: req.user.userId,
         }),
      });
   };

   const listAllProductsFromDiscount = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'List all discounts with products successfully',
         metadata: await getAllProductsFromDiscount(discountDb, productDb, {
            code: req.query.code,
            userId: req.query.userId,
            shopId: req.query.shopId,
            limit: req.query.limit,
            page: req.query.page,
         }),
      });
   };

   return {
      createNewDiscount,
      listAllProductsFromDiscount,
   };
}
