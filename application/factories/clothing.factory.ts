'use strict';

import { Api400Error } from '@frameworks/webserver/middlewares/error.response';
import {
   removeAttrUndefined,
   updateNestedObjectParser,
} from '@frameworks/webserver/utils';
import { ClothingModel } from '@frameworks/database/mongodb/models/product.model';
import { Product } from './product.factory';

class Clothing extends Product {
   async createProduct() {
      const newClothing = await ClothingModel.create(this.productAttributes);
      if (!newClothing) {
         throw new Api400Error('Create new clothing error');
      }

      const newProduct = await super
         .createProduct(newClothing._id)
         .catch(async (err) => {
            await newClothing.deleteOne({ _id: newClothing._id });
            throw err;
         });
      if (!newProduct) {
         throw new Api400Error('Create new product error');
      }
      return newProduct;
   }

   async updateProduct(productId) {
      // 1. remove attr has null undefined
      const objectParams = removeAttrUndefined(this);

      // 2. check update where?
      if (objectParams.productAttributes) {
         // update child
         await this.productDb.updateProductById({
            productId,
            payload: updateNestedObjectParser(objectParams.productAttributes),
            model: ClothingModel,
         });
      }

      return await super.updateProduct(
         productId,
         updateNestedObjectParser(objectParams)
      );
   }
}

export { Clothing };
