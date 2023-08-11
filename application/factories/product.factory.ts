'use strict';

import productDbRepo from '../repositories/IProductDb.repo';
import productDbRepoImpl from '../../frameworks/database/mongodb/repositories/productDb.repo';
import inventoryDbRepo from '../repositories/IInventoryDb.repo';
import inventoryDbRepoImpl from '../../frameworks/database/mongodb/repositories/inventoryDb.repo';
import { ProductModel } from '../../frameworks/database/mongodb/models/product.model';

class Product {
   public productDb = productDbRepo(productDbRepoImpl());
   public inventoryDb = inventoryDbRepo(inventoryDbRepoImpl());

   public productName: string;
   public productThumb: string;
   public productDescription: string;
   public productPrice: string;
   public productType: string;
   public productShop: string;
   public productAttributes: object;
   public productQuality: string;

   constructor({
      productName,
      productThumb,
      productDescription,
      productPrice,
      productType,
      productShop,
      productAttributes,
      productQuality,
   }) {
      this.productName = productName;
      this.productThumb = productThumb;
      this.productDescription = productDescription;
      this.productPrice = productPrice;
      this.productType = productType;
      this.productShop = productShop;
      this.productAttributes = productAttributes;
      this.productQuality = productQuality;
   }

   // create new Product
   async createProduct(productId) {
      const newProduct = await this.productDb.createProduct({
         payload: { ...this },
         model: ProductModel,
         productId,
      });

      if (newProduct) {
         // add productStock in inventory collections
         await this.inventoryDb.insertInventory({
            productId,
            shopId: this.productShop,
            stock: this.productQuality,
            location,
         });
      }

      return newProduct;
   }

   // update product
   async updateProduct(productId, payload) {
      return await this.productDb.updateProductById({
         productId,
         payload,
         model: ProductModel,
      });
   }
}

export { Product };
