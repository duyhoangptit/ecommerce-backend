'use strict';

export default async function addOrCreate(
   cartDb,
   productDb,
   { userId, payload }
) {
   const { productId, quantity } = payload;
   // Check cart exists
   const userCart = await cartDb.findCartByUserId(userId);

   const foundProduct = await productDb.findProduct({
      productId,
      unSelect: [
         '__v',
         '_id',
         'productVariations',
         'productQuantity',
         'productRatingAvg',
         'isDraft',
         'isPublish',
         'productSlug',
         'createdAt',
         'updatedAt',
      ],
   });

   const product = {
      productId,
      shopId: foundProduct.productShop,
      name: foundProduct.productName,
      description: foundProduct.productDescription,
      price: foundProduct.productPrice,
      thumbnail: foundProduct.productThumb,
      attributes: foundProduct.productAttributes,
      quantity,
   };

   if (!userCart) {
      // Create cart for user
      return await cartDb.createUserCart({ userId, product });
   }

   // Has cart but hasn't product in it
   if (!userCart.cartProducts.length) {
      userCart.cartProducts = [product];
      return await userCart.save();
   }

   // Kiem tra product co trong cart khong
   const foundProductInCart = userCart.cartProducts.find(
      (item) => item.productId === productId
   );
   if (!foundProductInCart) {
      // If product not exists in cart
      userCart.cartProducts = [...userCart.cartProducts, product];
      return await userCart.save();
   }

   // Has cart and has product in it
   return await cartDb.updateUserCartQuantity({ userId, product });
}
