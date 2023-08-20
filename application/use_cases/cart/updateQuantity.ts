'use strict';

import { Api400Error } from '../../../frameworks/webserver/middlewares/error.response';

//* Update cart
/**
 * shopOrderIds: [
 *    {
 *       shopId,
 *       itemProducts: [
 *          {
 *             quantity
 *             price,
 *             shopId
 *             oldQuantity
 *             productId
 *          }
 *       ],
 *       version
 *    }
 * ]
 */
export default async function updateQuantity(
   cartDb,
   productDb,
   { userId, shopOrderIds = [] }
) {
   const { productId, quantity, oldQuantity } =
      shopOrderIds[0]?.itemProducts[0];
   // Check product
   const foundProduct = await productDb.findProduct({
      productId,
      unSelect: ['__v'],
   });
   if (!foundProduct) throw new Api400Error('Product not found!');

   // Compare
   if (foundProduct.productShop.toString() !== shopOrderIds[0]?.shopId)
      throw new Api400Error('Product not belong to shop order');

   if (quantity === 0) {
      // Delete product
      return await cartDb.deleteUserItemCart({ userId, productId });
   }

   return await cartDb.updateUserCartQuantity({
      userId,
      product: {
         productId,
         quantity: quantity - oldQuantity,
      },
   });
}
