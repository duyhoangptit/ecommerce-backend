'use strict';
import * as redis from 'redis';
// Chuyen doi 1 ham thanh 1 ham async await, promise
import { promisify } from 'util';
import inventoryDbRepo from '@application/repositories/IInventoryDb.repo';
import inventoryDbRepoImpl from '@frameworks/database/mongodb/repositories/inventoryDb.repo';
const inventoryDb = inventoryDbRepo(inventoryDbRepoImpl());

const redisClient = redis.createClient();
const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setNX).bind(redisClient);

export default function redisServiceImpl() {
   const acquireLock = async (productId, quantity, cartId) => {
      const key = `lock_v2023_${productId}`;
      const retryTimes = 10;
      const expireTime = 3000; // 3 seconds

      for (let retryTime = 0; retryTime < retryTimes; retryTime++) {
         // Tao 1 key, thg nao nam giu duoc vao thanh toan
         const result = await setnxAsync(key, expireTime);

         if (result === 1) {
            // Thao tac voi inventory
            const isReservations = await inventoryDb.reservationInventory({
               productId,
               cartId,
               quantity,
            });
            if (isReservations) {
               await pexpire(key, expireTime);
               return key;
            }

            return null;
         } else {
            await new Promise((resolve) => setTimeout(resolve, 50));
         }
      }
   };

   const releaseLock = async (key) => {
      const delAsyncKey = promisify(redisClient.del).bind(redisClient);
      return await delAsyncKey(key);
   };

   return {
      acquireLock,
      releaseLock,
   };
}
