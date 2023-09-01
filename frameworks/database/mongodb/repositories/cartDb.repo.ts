'use strict';

import { convertToObjectIdMongo } from '@frameworks/webserver/utils';
import { CartModel } from '../models/cart.model';

export default function cartDbRepoImpl() {
   // Handle create cart, if it exists then addition quantity if it (outside cart)
   const createUserCart = async ({ userId, product }) => {
      const query = { cartUserId: userId, cartState: 'active' },
         updateOrInsert = {
            $addToSet: {
               cartProducts: product,
            },
         },
         options = { upsert: true, new: true };

      return await CartModel.findOneAndUpdate(query, updateOrInsert, options);
   };

   // Handle quantity in cart (inside cart)
   const updateUserCartQuantity = ({ userId, product }) => {
      const { productId, quantity } = product;

      const query = {
            cartUserId: userId,
            'cartProducts.productId': productId,
            cartState: 'active',
         },
         updateSet = {
            // $inc: thuat toan tang (increase)
            $inc: {
               // $: tim va update chinh phan tu do
               'cartProducts.$.quantity': quantity,
            },
         },
         options = { upsert: true, new: true };

      return CartModel.findOneAndUpdate(query, updateSet, options);
   };

   const findCartByUserId = (userId) =>
      CartModel.findOne({ cartUserId: userId });

   const deleteUserItemCart = ({ userId, productId }) => {
      const query = { cartUserId: userId, cartState: 'active' },
         updateSet = {
            $pull: {
               cartProducts: {
                  productId,
               },
            },
         };

      return CartModel.updateOne(query, updateSet);
   };

   const findCartById = (cartId) => {
      return CartModel.findOne({
         _id: convertToObjectIdMongo(cartId),
         cartState: 'active',
      }).lean();
   };

   return {
      createUserCart,
      updateUserCartQuantity,
      findCartByUserId,
      deleteUserItemCart,
      findCartById,
   };
}
