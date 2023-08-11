'use strict';

export default function inventoryDbRepo(repo) {
   const insertInventory = ({ productId, shopId, stock, location }) =>
      repo.insertInventory({ productId, shopId, stock, location });

   return {
      insertInventory,
   };
}
