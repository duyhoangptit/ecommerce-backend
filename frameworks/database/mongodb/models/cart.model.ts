'use strict';

import { Schema, model } from 'mongoose';
import { ICart } from '../../../../src/entities/cart';

const COLLECTION_NAME = 'Carts';
const DOCUMENT_NAME = 'Cart';

// Declare the Schema of the Mongo model
const cartSchema = new Schema<ICart>(
   {
      cartState: {
         type: String,
         required: true,
         enum: ['active', 'completed', 'failed', 'pending'],
         default: 'active',
      },
      cartProducts: {
         type: Array,
         required: true,
         default: [],
      },
      /**
       * [
       *   {
       *      productId,
       *      quantity,
       *      price,
       *      shopId,
       *      name
       *   }
       * ]
       */
      cartCountProduct: {
         type: Number,
         default: 0,
      },
      cartUserId: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
      // Thay doi truong createdAt, updatedAt
      // timestamps: {
      //    createdAt: 'created_at',
      //    updatedAt: 'updated_at',
      // },
      collection: COLLECTION_NAME,
   }
);

//Export the model
export const CartModel = model(DOCUMENT_NAME, cartSchema);
