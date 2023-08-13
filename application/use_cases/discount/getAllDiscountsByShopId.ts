'use strict';

import { convertToObjectIdMongo } from '../../../frameworks/webserver/utils';
import DiscountModel from '../../../frameworks/database/mongodb/models/discount.model';

export default async function getAllDiscountsByShopId(
   discountDb,
   { limit = 50, page = 1, shopId }
) {
   return await discountDb.findAllDiscountUnSelect({
      limit,
      page,
      filter: {
         discountShopId: convertToObjectIdMongo(shopId),
         discountIsActive: true,
      },
      select: ['__v', 'discountShopId'],
      model: DiscountModel,
   });
}
