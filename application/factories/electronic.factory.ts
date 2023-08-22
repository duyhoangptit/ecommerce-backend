'use strict';

import { ElectronicModel } from '@frameworks/database/mongodb/models/product.model';
import { Api400Error } from '@frameworks/webserver/middlewares/error.response';
import { Product } from './product.factory';

class Electronic extends Product {
   async createProduct() {
      const newElectronic = await ElectronicModel.create({
         ...this.productAttributes,
         productShop: this.productShop,
      });
      if (!newElectronic) {
         throw new Api400Error('Create new electronic error');
      }

      const newProduct = await super
         .createProduct(newElectronic._id)
         .catch(async (err) => {
            await newElectronic.deleteOne({ _id: newElectronic._id });
            throw err;
         });
      if (!newProduct) {
         throw new Api400Error('Create new product error');
      }
      return newProduct;
   }
}

export { Electronic };
