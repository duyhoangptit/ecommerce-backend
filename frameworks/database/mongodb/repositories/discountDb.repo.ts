'use strict';

import DiscountModel from '../models/discount.model';
import { convertToObjectIdMongo } from '../../../webserver/utils';

export default function discountDbRepoImpl() {
   const createDiscount = ({
      code,
      startDate,
      endDate,
      isActive,
      shopId,
      minOrderValue,
      productIds,
      appliesTo,
      name,
      description,
      type,
      value,
      maxValue,
      maxUses,
      usesCount,
      maxUsesPerUser,
      usersUsed,
   }) =>
      DiscountModel.create({
         discountCode: code,
         discountStartDate: new Date(startDate),
         discountEndDate: new Date(endDate),
         discountIsActive: isActive,
         discountShopId: convertToObjectIdMongo(shopId),
         discountMinOrderValue: minOrderValue || 0,
         discountProductIds: appliesTo === 'all' ? [] : productIds,
         discountAppliesTo: appliesTo,
         discountName: name,
         discountDescription: description,
         discountType: type,
         discountValue: value,
         discountMaxValue: maxValue,
         discountMaxUses: maxUses,
         discountUsesCount: usesCount,
         discountMaxUsesPerUser: maxUsesPerUser,
         discountUsersUsed: usersUsed,
      });

   const findOneDiscount = (filter) => DiscountModel.findOne(filter);

   return {
      createDiscount,
      findOneDiscount,
   };
}
