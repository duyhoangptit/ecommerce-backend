'use strict';

export default function redisServiceInterface(service) {
   const acquireLock = (productId, quantity, cartId) =>
      service.acquireLock(productId, quantity, cartId);

   const releaseLock = (key) => service.releaseLock(key);

   return {
      acquireLock,
      releaseLock,
   };
}
