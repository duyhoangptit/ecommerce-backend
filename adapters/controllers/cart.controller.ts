'use strict';

import { NextFunction, Response } from 'express';
import { IRequest } from '@config/interfaces/express.interface';
import {
   CREATED,
   OK,
} from '@frameworks/webserver/middlewares/success.response';
import addOrCreate from '@application/use_cases/cart/addOrCreate';
import updateQuantity from '@application/use_cases/cart/updateQuantity';
import deleteItem from '@application/use_cases/cart/deleteItem';
import getUserCart from '@application/use_cases/cart/getUserCart';

/**
 * Cart Service
 * 1. Add product to cart [User]
 * 2. Reduce product quantity [User]
 * 3. Increase product quantity [User]
 * 4. Get cart [User]
 * 5. Delete cart [User]
 * 6. Delete product from cart [User]
 */
export default function cartController(
   cartDbRepo,
   cartDbRepoImpl,
   productDbRepo,
   productDbRepoImpl
) {
   const cartDb = cartDbRepo(cartDbRepoImpl());
   const productDb = productDbRepo(productDbRepoImpl());

   const addToCart = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Add to Cart successfully',
         metadata: await addOrCreate(cartDb, productDb, req.body),
      });
   };

   const updateQuantityItemCart = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Update cart successfully',
         metadata: await updateQuantity(cartDb, productDb, req.body),
      });
   };

   const deleteUserItemCart = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Delete cart successfully',
         metadata: await deleteItem(cartDb, req.body),
      });
   };

   const getListUserCart = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Get cart successfully',
         metadata: await getUserCart(cartDb, req.query.userId),
      });
   };

   return {
      addToCart,
      updateQuantityItemCart,
      deleteUserItemCart,
      getListUserCart,
   };
}
