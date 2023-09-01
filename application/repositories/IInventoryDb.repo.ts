'use strict';

export default function inventoryDbRepo(repo) {
   const insertInventory = ({ productId, shopId, stock, location }) =>
      repo.insertInventory({ productId, shopId, stock, location });

   const reservationInventory = ({ productId, quantity, cartId }) =>
      (repo.reservationInventory = { productId, quantity, cartId });

   const updateStock = ({ shopId, productId, stock, location }) =>
      repo.updateStock({ shopId, productId, stock, location });

   return {
      insertInventory,
      reservationInventory,
      updateStock,
   };
}
