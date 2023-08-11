'use strict';

import { asyncHandler } from '../middlewares/async.catch';

import discountController from '../../../adapters/controllers/discount.controller';
import discountDbRepo from '../../../application/repositories/IDiscountDb.repo';
import discountDbRepoImpl from '../../database/mongodb/repositories/discountDb.repo';
import authMiddleware from '../middlewares/auth.middleware';

export default function discountRouter(express) {
   const router = express.Router();

   const controller = discountController(discountDbRepo, discountDbRepoImpl);

   // authentication
   const auth = authMiddleware();
   router.use(asyncHandler(auth.authentication));

   router.route('/').post(asyncHandler(controller.createNewDiscount));

   return router;
}
