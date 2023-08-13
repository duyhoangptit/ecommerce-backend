'use strict';

import { Api400Error } from '../../../frameworks/webserver/middlewares/error.response';

export default async function cancel(discountDb, { code, shopId, userId }) {
   const foundDiscount = await discountDb.findOneDiscount({
      discountCode: code,
      discountShopId: shopId,
   });

   if (!foundDiscount) throw new Api400Error('Discount code not exist!');

   const result = await discountDb.findByIdAndUpdate(foundDiscount._id, {
      $pull: {
         discountUsersUsed: userId,
      },
      $inc: {
         discountMaxUses: 1,
         discountUsesCount: -1,
      },
   });

   return result;
}
