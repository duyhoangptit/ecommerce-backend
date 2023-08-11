'use strict';

import DiscountModel from '../models/discount.model';
import { convertToObjectIdMongo } from '../../../webserver/utils';

export default function discountDbRepoImpl() {
   const createDiscount = (discountEntity) =>
      DiscountModel.create({
         discountCode: discountEntity.getCode(),
         discountStartDate: new Date(discountEntity.getStartDate()),
         discountEndDate: new Date(discountEntity.getEndDate()),
         discountIsActive: discountEntity.getIsActive(),
         discountShopId: convertToObjectIdMongo(discountEntity.getShopId()),
         discountMinOrderValue: discountEntity.getMinOrderValue() || 0,
         discountProductIds:
            discountEntity.getAppliesTo() === 'all'
               ? []
               : discountEntity.getProductIds(),
         discountAppliesTo: discountEntity.getAppliesTo(),
         discountName: discountEntity.getName(),
         discountDescription: discountEntity.getDescription(),
         discountType: discountEntity.getType(),
         discountValue: discountEntity.getValue(),
         discountMaxValue: discountEntity.getMaxValue(),
         discountMaxUses: discountEntity.getMaxUses(),
         discountUsesCount: discountEntity.getUsesCount(),
         discountMaxUsesPerUser: discountEntity.getMaxUsesPerUser(),
         discountUsersUsed: discountEntity.getUsersUsed(),
      });

   const findOneDiscount = (filter) => DiscountModel.findOne(filter);

   return {
      createDiscount,
      findOneDiscount,
   };
}
