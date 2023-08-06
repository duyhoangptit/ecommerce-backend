'use strict';

export default function findAllPublishForShop(
   productDb,
   { query, limit, skip }
) {
   return productDb.findAllPublishForShop({ query, limit, skip });
}
