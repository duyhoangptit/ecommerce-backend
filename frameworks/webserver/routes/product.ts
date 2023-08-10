import authMiddleware from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async.catch';

import productController from '../../../adapters/controllers/product.controller';
import productDbRepo from '../../../application/repositories/IProductDb.repo';
import productDbRepoImpl from '../../database/mongodb/repositories/productDb.repo';
import { IRequest } from '../../../config/interfaces/express.interface';
import { NextFunction, Response } from 'express';

export default function productRouter(express) {
   const router = express.Router();
   const controller = productController(productDbRepo, productDbRepoImpl);

   const auth = authMiddleware();

   router.get('/search/:keySearch', asyncHandler(controller.searchProducts));
   const aliasSearch = (req: IRequest, res: Response, next: NextFunction) => {
      req.query.page = '1';
      req.query.limit = '5';
      req.query.sort = '-productName';
      req.query.fields = 'productName, productPrice';
      next();
   };

   router.get('/advanced-search', aliasSearch, controller.advancedSearch);
   router.get('/', asyncHandler(controller.findAllProducts));
   router.get('/:productId', asyncHandler(controller.findProduct));

   router.use(asyncHandler(auth.authentication));

   router.post('/', asyncHandler(controller.createProduct));
   router.post('/publish/:productId', controller.publishProductByShop);
   router.patch('/:productId', asyncHandler(controller.updateProduct));
   router.get('/drafts/all', asyncHandler(controller.getAllDraftsForShop));
   router.get(
      '/published/all',
      asyncHandler(controller.getAllPublishedForShop)
   );

   return router;
}
