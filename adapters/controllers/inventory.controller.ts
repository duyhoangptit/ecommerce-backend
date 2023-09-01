'use strict';

import addStock from '@application/use_cases/inventory/addStock';
import { IRequest } from '@config/interfaces/express.interface';
import { OK } from '@frameworks/webserver/middlewares/success.response';
import { NextFunction, Response } from 'express';

export default function inventoryController(
   inventoryDbRepo,
   inventoryDbRepoImpl,
   productDbRepo,
   productDbRepoImpl
) {
   const inventoryDb = inventoryDbRepo(inventoryDbRepoImpl());
   const productDb = productDbRepo(productDbRepoImpl());

   const addStockToInventory = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Add stock to inventory successfully',
         metadata: await addStock(inventoryDb, productDb, req.body),
      });
   };

   return {
      addStockToInventory,
   };
}
