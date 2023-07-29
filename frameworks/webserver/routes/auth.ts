'use strict';

import { asyncHandler } from '../middlewares/async.catch';

import authController from '../../../adapters/controllers/auth.controller';
import shopDbRepo from '../../../application/repositories/IShopDb.repo';
import shopDbRepoImpl from '../../database/mongodb/repositories/shopDB.repo';
import keyTokenDbRepo from '../../../application/repositories/IKeyTokenDb.repo';
import keyTokenDbRepoImpl from '../../database/mongodb/repositories/keyTokenDb.repo';
import authServiceInterface from '../../../application/services/auth.service';
import authServiceImpl from '../../services/auth.service';
import authMiddleware from '../middlewares/auth.middleware';

export default function authRouter(express) {
   const router = express.Router();

   const controller = authController(
      shopDbRepo,
      shopDbRepoImpl,
      keyTokenDbRepo,
      keyTokenDbRepoImpl,
      authServiceInterface,
      authServiceImpl
   );

   router.route('/signup').post(asyncHandler(controller.signupUser));
   router.route('/login').post(asyncHandler(controller.loginUser));

   // authentication
   const auth = authMiddleware();
   router.use(asyncHandler(auth.authentication));

   return router;
}
