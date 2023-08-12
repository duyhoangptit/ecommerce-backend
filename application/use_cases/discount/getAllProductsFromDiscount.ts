'use strict';

import { Api400Error } from '../../../frameworks/webserver/middlewares/error.response';
import { convertToObjectIdMongo } from '../../../frameworks/webserver/utils';

export default async function getAllProductsFromDiscount(
   discountDb,
   productDb,
   { code, shopId, userId, limit, page }
) {
   // Create index for discount
   const foundDiscount = await discountDb.findOneDiscount({
      discountCode: code,
      discountShopId: shopId,
   });

   if (!foundDiscount?.discountIsActive)
      throw new Api400Error('Discount code not exist!');

   const { discountAppliesTo, discountProductIds } = foundDiscount;
   let products;
   if (discountAppliesTo === 'all') {
      products = await productDb.findAllProducts({
         filter: {
            productShop: convertToObjectIdMongo(shopId),
            isPublish: true,
         },
         limit,
         page,
         sort: 'ctime',
         select: ['productName'],
      });
   }

   if (discountAppliesTo === 'specific') {
      products = await productDb.findAllProducts({
         filter: {
            _id: { $in: discountProductIds },
            productShop: convertToObjectIdMongo(shopId),
            isPublish: true,
         },
         limit,
         page,
         sort: 'ctime',
         select: ['productName'],
      });
   }

   return products;
}
