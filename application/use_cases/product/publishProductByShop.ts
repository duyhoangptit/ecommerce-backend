'use strict';

export default function publishProductByShop(
   productDb,
   { productShop, productId }
) {
   return productDb.publishProductByShop({ productShop, productId });
}
