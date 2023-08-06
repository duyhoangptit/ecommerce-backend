'use strict';

export default function findOneProduct(productDb, { productId, unSelect }) {
   return productDb.findProduct({ productId, unSelect });
}
