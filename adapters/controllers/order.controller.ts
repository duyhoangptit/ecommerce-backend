'use strict';

import checkout from '@application/use_cases/order/checkout';
import { IRequest } from '@config/interfaces/express.interface';
import { OK } from '@frameworks/webserver/middlewares/success.response';
import { NextFunction, Response } from 'express';

export default function orderController(
   orderDbRepo,
   orderDbRepoImpl,
   cartDbRepo,
   cartDbRepoImpl,
   productDbRepo,
   productDbRepoImpl,
   discountDbRepo,
   discountDbRepoImpl,
   redisServiceInterface,
   redisServiceImpl
) {
   const orderDb = orderDbRepo(orderDbRepoImpl());
   const cartDb = cartDbRepo(cartDbRepoImpl());
   const productDb = productDbRepo(productDbRepoImpl());
   const discountDb = discountDbRepo(discountDbRepoImpl());
   const redisService = redisServiceInterface(redisServiceImpl());

   const checkoutReview = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Checkout review fetched successfully',
         metadata: await checkout(cartDb, productDb, discountDb, req.body),
      });
   };

   return {
      checkoutReview,
   };
}
