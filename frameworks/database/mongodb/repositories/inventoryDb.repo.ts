'use strict';

import inventoryModel from '../models/inventory.model';
import { Types } from 'mongoose';

export default function inventoryDbRepoImpl() {
   const insertInventory = ({
      productId,
      shopId,
      stock,
      location = 'unknown',
   }) =>
      inventoryModel.create({
         invenProductId: new Types.ObjectId(productId),
         invenShopId: new Types.ObjectId(shopId),
         invenStock: stock,
         invenLocation: location,
      });

   return {
      insertInventory,
   };
}
