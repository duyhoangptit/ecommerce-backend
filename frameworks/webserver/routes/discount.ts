'use strict';

import { asyncHandler } from '../middlewares/async.catch';

import discountController from '@adapters/controllers/discount.controller';
import discountDbRepo from '@application/repositories/IDiscountDb.repo';
import discountDbRepoImpl from '../../database/mongodb/repositories/discountDb.repo';
import productDbRepo from '@application/repositories/IProductDb.repo';
import productDbRepoImpl from '../../database/mongodb/repositories/productDb.repo';
import authMiddleware from '../middlewares/auth.middleware';

export default function discountRouter(express) {
   const router = express.Router();

   const controller = discountController(
      discountDbRepo,
      discountDbRepoImpl,
      productDbRepo,
      productDbRepoImpl
   );

   // Get amount a discount
   router.route('/amount').post(asyncHandler(controller.getDiscountAmount));
   router
      .route('/list_product_code')
      .get(asyncHandler(controller.listAllProductsFromDiscount));

   // authentication
   const auth = authMiddleware();
   router.use(asyncHandler(auth.authentication));

   router
      .route('/')
      .post(asyncHandler(controller.createNewDiscount))
      .get(asyncHandler(controller.getAllDiscounts));

   return router;
}
