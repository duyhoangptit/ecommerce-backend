'use strict';

export default function findAllDraftsForShop(
   productDb,
   { query, limit, skip }
) {
   return productDb.findAllDraftsForShop({ query, limit, skip });
}
