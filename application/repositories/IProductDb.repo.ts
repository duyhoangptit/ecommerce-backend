'use strict';

export default function productDbRepo(repo) {
   // 1.
   const findAllDraftsForShop = ({ query, limit, skip }) =>
      repo.findAllDraftsForShop({ query, limit, skip });

   // 2.
   const publishProductByShop = ({ productShop, productId }) =>
      repo.publishProductByShop({ productShop, productId });

   // 3.
   const findAllPublishForShop = ({ query, limit, skip }) =>
      repo.findAllPublishForShop({ query, limit, skip });

   // 4.
   const unPublishProductByShop = ({ productShop, productId }) =>
      repo.unPublishProductByShop({ productShop, productId });

   // 5.
   const searchProductByUser = ({ keySearch }) =>
      repo.searchProductByUser({ keySearch });

   // 6.
   const findAllProducts = ({ limit, sort, page, filter, select }) =>
      repo.findAllProducts({ limit, sort, page, filter, select });

   // 7.
   const findProduct = ({ productId, unSelect }) =>
      repo.findProduct({ productId, unSelect });

   // 8.
   const updateProductById = ({ productId, payload, model, isNew = true }) =>
      repo.updateProductById({
         productId,
         payload,
         model,
         isNew,
      });

   // 9.
   const createProduct = ({ productId, payload, model }) =>
      repo.createProduct({ productId, payload, model });

   // 10.
   const checkProductByServer = (products) =>
      repo.checkProductByServer(products);

   //11.
   const advancedSearch = (queryInput) => repo.advancedSearch(queryInput);

   return {
      findAllDraftsForShop,
      publishProductByShop,
      findAllPublishForShop,
      unPublishProductByShop,
      searchProductByUser,
      findAllProducts,
      findProduct,
      updateProductById,
      createProduct,
      checkProductByServer,
      advancedSearch,
   };
}
