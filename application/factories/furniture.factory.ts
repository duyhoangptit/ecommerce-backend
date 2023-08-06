'use strict';

import { FurnitureModel } from '../../frameworks/database/mongodb/models/product.model';
import { Api400Error } from '../../frameworks/webserver/middlewares/error.response';
import { Product } from './product.factory';

class Furniture extends Product {
   async createProduct() {
      const newFurniture = await FurnitureModel.create({
         ...this.productAttributes,
         productShop: this.productShop,
      });
      if (!newFurniture) {
         throw new Api400Error('Create new Furniture error');
      }

      const newProduct = await super.createProduct(newFurniture._id);
      if (!newProduct) {
         throw new Api400Error('Create new product error');
      }

      return newProduct;
   }
}

export { Furniture };
