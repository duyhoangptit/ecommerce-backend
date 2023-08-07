'use strict';

import { Api400Error } from '../../frameworks/webserver/middlewares/error.response';
import findAllProducts from '../use_cases/product/findAllProducts';
import publishProductByShop from '../use_cases/product/publishProductByShop';
import findAllDraftsForShop from '../use_cases/product/findAllDraftsForShop';
import findAllPublishForShop from '../use_cases/product/findAllPublishForShop';
import searchProducts from '../use_cases/product/searchProducts';
import findOneProduct from '../use_cases/product/findOneProduct';
import advancedSearch from '../use_cases/product/advancedSearch';

const {
   selectDataObject,
   unSelectDataObject,
} = require('../../frameworks/webserver/utils');

class ProductService {
   static productRegistry = {};

   static registerProductType(type, classRef) {
      ProductService.productRegistry[type] = classRef;
   }

   static async createProduct(type, payload) {
      const productClass = ProductService.productRegistry[type];
      if (!productClass) throw new Api400Error('messages.error006');

      return new productClass(payload).createProduct();
   }

   static async updateProduct(type, productId, payload) {
      const productClass = ProductService.productRegistry[type];
      if (!productClass) throw new Api400Error('messages.error006');

      return new productClass(payload).updateProduct(productId);
   }

   // PUT
   static async publishProductByShop(productDb, { productShop, productId }) {
      // find one
      return await publishProductByShop(productDb, { productShop, productId });
   }

   // query
   static async findAllDraftsForShop(
      productDb,
      { productShop, limit = 50, skip = 0 }
   ) {
      const query = { productShop, isDraft: true };
      return await findAllDraftsForShop(productDb, { query, limit, skip });
   }

   static async findAllPublishForShop(
      productDb,
      { productShop, limit = 50, skip = 0 }
   ) {
      const query = { productShop, isPublished: true };
      return await findAllPublishForShop(productDb, { query, limit, skip });
   }

   static async searchProducts(productShop, { keySearch }) {
      return await searchProducts(productShop, { keySearch });
   }

   static async findAllProducts(
      productDb,
      { limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }
   ) {
      return await findAllProducts(productDb, {
         limit,
         sort,
         filter,
         page,
         select: selectDataObject([
            'productName',
            'productPrice',
            'productThumb',
            'productShop',
         ]),
      });
   }

   static async findOneProduct(productDb, productId) {
      return await findOneProduct(productDb, {
         productId,
         unSelect: unSelectDataObject(['__v', 'variations']),
      });
   }

   static async advancedSearch(productDb, query) {
      return await advancedSearch(productDb, query);
   }
}

export default ProductService;
