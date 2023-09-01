'use strict';

import inventoryController from '@adapters/controllers/inventory.controller';
import { asyncHandler } from '../middlewares/async.catch';
import inventoryDbRepo from '@application/repositories/IInventoryDb.repo';
import inventoryDbRepoImpl from '@frameworks/database/mongodb/repositories/inventoryDb.repo';
import productDbRepo from '@application/repositories/IProductDb.repo';
import productDbRepoImpl from '@frameworks/database/mongodb/repositories/productDb.repo';
import authMiddleware from '../middlewares/auth.middleware';

export default function inventoryRouter(express) {
   const router = express.Router();
   const controller = inventoryController(
      inventoryDbRepo,
      inventoryDbRepoImpl,
      productDbRepo,
      productDbRepoImpl
   );

   // Authentication
   const auth = authMiddleware();
   router.use(asyncHandler(auth.authentication));

   router.route('/').post(asyncHandler(controller.addStockToInventory));

   return router;
}
