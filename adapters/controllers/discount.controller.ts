'use strict';

import { IRequest } from '../../config/interfaces/express.interface';
import { NextFunction, Response } from 'express';
import { CREATED, OK } from '../../frameworks/webserver/middlewares/success.response';
import createDiscount from '../../application/use_cases/discount/create';
import getAllProductsFromDiscount from '../../application/use_cases/discount/getAllProductsFromDiscount';
import getAllDiscountsByShopId from '../../application/use_cases/discount/getAllDiscountsByShopId';
import destroy from '../../application/use_cases/discount/destroy';
import cancel from '../../application/use_cases/discount/cancel';
import getDiscountAmountByCode from '../../application/use_cases/discount/getDiscountAmount';

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
      OK({
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

   const getAllDiscounts = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Get all discounts successfully',
         metadata: await getAllDiscountsByShopId(discountDb, {
            ...req.query,
            shopId: req.user.userId,
         }),
      });
   };

   const getDiscountAmount = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Get discount amount successfully',
         metadata: await getDiscountAmountByCode(discountDb, {
            ...req.body,
            shopId: req.user.userId,
         }),
      });
   };

   const deleteDiscount = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Delete discount successfully',
         metadata: await destroy(discountDb, {
            ...req.body,
            shopId: req.user.userId || req.body.shopId,
         }),
      });
   };

   const cancelDiscount = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Cancel discount successfully',
         metadata: await cancel(discountDb, {
            ...req.body,
            shopId: req.user.userId,
         }),
      });
   };

   return {
      createNewDiscount,
      listAllProductsFromDiscount,
      getAllDiscounts,
      getDiscountAmount,
      deleteDiscount,
      cancelDiscount,
   };
}
