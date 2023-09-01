'use strict';

import orderController from '@adapters/controllers/order.controller';
import { asyncHandler } from '../middlewares/async.catch';
import orderDbRepo from '@application/repositories/IOrderDb.repo';
import orderDbRepoImpl from '@frameworks/database/mongodb/repositories/orderDb.repo';
import cartDbRepo from '@application/repositories/ICartDb.repo';
import cartDbRepoImpl from '@frameworks/database/mongodb/repositories/cartDb.repo';
import productDbRepo from '@application/repositories/IProductDb.repo';
import productDbRepoImpl from '@frameworks/database/mongodb/repositories/productDb.repo';
import discountDbRepo from '@application/repositories/IDiscountDb.repo';
import discountDbRepoImpl from '@frameworks/database/mongodb/repositories/discountDb.repo';
import redisServiceInterface from '@application/services/redis.service';
import redisServiceImpl from '@frameworks/services/redis.service';

export default function orderRouter(express) {
   const router = express.Router();

   const controller = orderController(
      orderDbRepo,
      orderDbRepoImpl,
      cartDbRepo,
      cartDbRepoImpl,
      productDbRepo,
      productDbRepoImpl,
      discountDbRepo,
      discountDbRepoImpl,
      redisServiceInterface,
      redisServiceImpl
   );

   router.route('/review').post(asyncHandler(controller.checkoutReview));

   return router;
}
