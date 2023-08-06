'use strict';

export default function advancedSearch(
   productDb,
   { limit, sort, filter, page, select }
) {
   return productDb.findAllProducts({ limit, sort, filter, page, select });
}
