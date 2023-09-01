'use strict';

import { Api400Error } from '@frameworks/webserver/middlewares/error.response';
import checkout from './checkout';

export default async function order(
   orderDb,
   redisService,
   cartDb,
   productDb,
   discountDb,
   { shopOrderIds, cartId, userId, userAddress, userPayment }
) {
   const { shopOrderIdsNew, checkoutOrder } = await checkout(
      cartDb,
      productDb,
      discountDb,
      {
         cartId,
         userId,
         shopOrderIds,
      }
   );

   // Check lai san pham co con hang hay khong
   const products = shopOrderIdsNew.flatMap((order) => order.itemProducts);
   const acquireProduct = [];
   for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const keyLock = await redisService.acquireLock(
         productId,
         quantity,
         cartId
      );
      acquireProduct.push(keyLock ? true : false);
      if (keyLock) {
         await redisService.releaseLock(keyLock);
      }
   }

   // Check lai neu co 1 san pham het hang trong kho
   if (acquireProduct.includes(false))
      throw new Api400Error('Product is updated. Please return cart ');

   const newOrder = await orderDb.createNewOrder({
      userId,
      checkoutOrder,
      userAddress,
      userPayment,
      shopOrderIdsNew,
   });

   // Neu insert thanh cong
   if (newOrder) {
      // Remove products in cart
   }

   return newOrder;
}
