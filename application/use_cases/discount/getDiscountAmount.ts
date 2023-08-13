'use strict';

//* Apply discount
import {
   Api400Error,
} from '../../../frameworks/webserver/middlewares/error.response';

/**
 * products = [
 *    {
 *       productId,
 *       name,
 *       quantity,
 *       price,
 *       shopId
 *    },
 *    {
 *       productId,
 *       name,
 *       quantity,
 *       price,
 *       shopId
 *    }
 * ]
 */
export default async function getDiscountAmountByCode(
   discountDb,
   { code, userId, shopId, products }
) {
   const foundDiscount = await discountDb.findOneDiscount({
      discountCode: code,
      discountShopId: shopId,
   });

   if (!foundDiscount) throw new Api400Error('Discount code not exist');

   const {
      discountIsActive,
      discountMaxUses,
      discountMinOrderValue,
      discountStartDate,
      discountEndDate,
      discountMaxUsesPerUser,
      discountUsersUsed,
      discountType,
      discountValue,
   } = foundDiscount;

   if (!discountIsActive) throw new Api400Error('Discount code has expired');
   if (!discountMaxUses) throw new Api400Error('Discount are out');
   if (new Date() > new Date(discountEndDate))
      throw new Api400Error('Discount code has expired');

   // Check xem co set gia tri toi thieu hay k
   let totalOrder;
   if (discountMinOrderValue > 0) {
      totalOrder = products.reduce((acc, product) => {
         return acc + product.quantity * product.price;
      }, 0);

      if (totalOrder < discountMinOrderValue)
         throw new Api400Error(
            `Discount requires a minimum order value of ${discountMinOrderValue}!`
         );
   }

   if (discountMaxUsesPerUser > 0) {
      const userUseDiscount = discountUsersUsed.find(
         (user) => user.userId === userId
      );

      if (userUseDiscount) {
         //
         throw new Api400Error('User has exceeded the maximum number of uses');
      }
   }

   // Check xem discount nay la fixed_amount hay percentage
   const amount =
      discountType === 'fixed_amount'
         ? discountValue
         : (totalOrder * discountValue) / 100;

   return {
      totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount,
   };
}
