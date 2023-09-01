'use strict';

export default function orderDbRepo(repo) {
   const createNewOrder = ({
      userId,
      checkoutOrder,
      userAddress,
      userPayment,
      shopOrderIdsNew,
   }) =>
      repo.createNewOrder({
         userId,
         checkoutOrder,
         userAddress,
         userPayment,
         shopOrderIdsNew,
      });

   return {
      createNewOrder,
   };
}
