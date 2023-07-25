'use strict';

import authController from '../../../adapters/controllers/auth.controller';
import shopDbRepo from '../../../application/repositories/IShopDb.repo';
import shopDbRepoImpl from '../../database/mongodb/repositories/shopDB.repo';
import keyTokenDbRepo from '../../../application/repositories/IKeyTokenDb.repo';
import keyTokenDbRepoImpl from '../../database/mongodb/repositories/keyTokenDb.repo';
import authServiceInterface from '../../../application/services/auth.service';
import authServiceImpl from '../../services/auth.service';
import lodashUtil from '../utils/filterData';

export default function authRouter(express) {
   const router = express.Router();

   const controller = authController(
      shopDbRepo,
      shopDbRepoImpl,
      keyTokenDbRepo,
      keyTokenDbRepoImpl,
      authServiceInterface,
      authServiceImpl,
      lodashUtil
   );

   router.route('/signup').post(controller.register);

   return router;
}
