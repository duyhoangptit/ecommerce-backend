'use strict';

import { asyncHandler } from '../middlewares/async.catch';
import cartController from '../../../adapters/controllers/cart.controller';
import cartDbRepo from '../../../application/repositories/ICartDb.repo';
import cartDbRepoImpl from '../../database/mongodb/repositories/cartDb.repo';
import productDbRepo from '../../../application/repositories/IProductDb.repo';
import productDbRepoImpl from '../../database/mongodb/repositories/productDb.repo';

export default function cartRouter(express) {
   const router = express.Router();

   const controller = cartController(
      cartDbRepo,
      cartDbRepoImpl,
      productDbRepo,
      productDbRepoImpl
   );

   // Get amount a cart
   router
      .route('/')
      .post(asyncHandler(controller.addToCart))
      .delete(asyncHandler(controller.deleteUserItemCart))
      .get(asyncHandler(controller.getListUserCart));
   router
      .route('/update')
      .post(asyncHandler(controller.updateQuantityItemCart));

   return router;
}
