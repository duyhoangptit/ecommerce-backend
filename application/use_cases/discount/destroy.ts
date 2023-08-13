'use strict';

import { convertToObjectIdMongo } from '../../../frameworks/webserver/utils';
import { Api400Error } from '../../../frameworks/webserver/middlewares/error.response';

export default async function destroy(discountDb, { shopId, code }) {
   const foundDiscount = await discountDb.findOneDiscount({
      discountCode: code,
      shopId,
   });

   if (!foundDiscount) throw new Api400Error('Discount code not exist');

   const deleted = await discountDb.findOneAndDelete({
      discountShopId: convertToObjectIdMongo(shopId),
      discountCode: code,
   });

   // Trc khi xoa, kiem tra xem co dang duoc su dung o dau hay k
   return deleted;
}
