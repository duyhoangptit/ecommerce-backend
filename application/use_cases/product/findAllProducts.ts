'use strict';

export default function findAllProducts(
   productDb,
   { limit, sort, filter, page, select }
) {
   return productDb.findAllProducts({ limit, sort, filter, page, select });
}
