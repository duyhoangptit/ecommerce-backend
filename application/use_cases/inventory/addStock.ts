'use strict';

import { Api400Error } from '@frameworks/webserver/middlewares/error.response';

export default async function addStock(
   inventoryDb,
   productDb,
   { stock, productId, shopId, location = 'Cao Son 1, Son Cam, Thai Nguyen' }
) {
   const product = await productDb.findProduct({
      productId,
   });
   if (!product) throw new Api400Error('Product does not exist!');

   return await inventoryDb.updateStock({ stock, productId, shopId, location });
}
