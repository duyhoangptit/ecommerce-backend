'use strict';

import { OrderModel } from '../models/order.model';

export default function orderDbRepoImpl() {
   const createNewOrder = ({
      userId,
      checkoutOrder,
      userAddress,
      userPayment,
      shopOrderIdsNew,
   }) =>
      OrderModel.create({
         orderUserId: userId,
         orderCheckout: checkoutOrder,
         orderShipping: userAddress,
         orderPayment: userPayment,
         orderProducts: shopOrderIdsNew,
      });

   return {
      createNewOrder,
   };
}
