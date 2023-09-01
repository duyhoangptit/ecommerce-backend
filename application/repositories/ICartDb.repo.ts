'use strict';

export default function cartDbRepo(repo) {
   const createUserCart = ({ userId, productId }) =>
      repo.createUserCart({ userId, productId });

   const updateUserCartQuantity = ({ userId, product }) =>
      repo.updateUserCartQuantity({ userId, product });

   const findCartByUserId = (userId) => repo.findCartByUserId(userId);

   const deleteUserItemCart = ({ userId, productId }) =>
      repo.deleteUserItemCart({ userId, productId });

   const findCartById = (userId) => repo.findCartById(userId);

   return {
      createUserCart,
      updateUserCartQuantity,
      findCartByUserId,
      deleteUserItemCart,
      findCartById,
   };
}
