'use strict';

export default function searchProducts(productDb, { keySearch }) {
   return productDb.searchProductByUser({ keySearch });
}
