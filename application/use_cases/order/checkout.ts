'use strict';

import { Api400Error } from '@frameworks/webserver/middlewares/error.response';

/**
 * Login or without login
 * {
 *  cartId,
 *  userId,
 *  shopOrderIds: [
 *   {
 *     shopId,
 *     shopDiscounts: [
 *       {
 *         shopId,
 *         discountId,
 *         discountCode
 *       }
 *     ],
 *     itemProducts: [
 *       {
 *         price,
 *         quantity,
 *         productId
 *       }
 *     ]
 *   }
 *  ]
 * }
 */
export default async function checkout(
   cartDb,
   productDb,
   discountDb,
   { cartId, userId, shopOrderIds }
) {
   // Check cartId exists
   const foundCart = await cartDb.findCartById({ cartId });
   if (!foundCart) throw new Api400Error('Cart does not exist!');

   const checkoutOrder = {
         totalPrice: 0, // tong tien hang
         feeShip: 0,
         totalDiscount: 0,
         totalCheckout: 0, // tong thanh toan
      },
      shopOrderIdsNew = [];

   // Tinh tong tien bill
   for (const shopOrder of shopOrderIds) {
      const { shopId, shopDiscounts = [], itemProducts = [] } = shopOrder;

      // Check products available
      const productsAvailable = await productDb.checkProductByServer(
         itemProducts
      );
      if (!productsAvailable[0]) throw new Api400Error('Order not available');

      // Tong tien don hang
      const checkoutPrice = productsAvailable.reduce((sum, product) => {
         return sum + product.quantity * product.price;
      }, 0);

      // Tong tien trc khi xu ly
      checkoutOrder.totalPrice = +checkoutPrice;

      const itemCheckout = {
         shopId,
         shopDiscounts,
         priceRaw: checkoutPrice, // tien trc khi giam gia
         priceApplyDiscount: checkoutPrice,
         itemProducts: productsAvailable,
      };

      // Neu shopDiscounts ton tai, check xem co hop le hay khong
      if (shopDiscounts.length > 0) {
         // Gia su chi co 1 discount
         // Get amount discount
         const { totalPrice = 0, discount = 0 } =
            await discountDb.getDiscountAmount({
               discountCode: shopDiscounts[0].discountCode,
               userId,
               shopId,
               products: productsAvailable,
            });

         // Tong cong discount
         checkoutOrder.totalDiscount += discount;

         // Neu tien giam gia > 0
         if (discount > 0)
            itemCheckout.priceApplyDiscount = checkoutPrice - discount;
      }

      // Tong thanh toan cuoi cung
      checkoutOrder.totalCheckout += itemCheckout.priceApplyDiscount;
      shopOrderIdsNew.push(itemCheckout);
   }

   return {
      shopOrderIds,
      shopOrderIdsNew,
      checkoutOrder,
   };
}
