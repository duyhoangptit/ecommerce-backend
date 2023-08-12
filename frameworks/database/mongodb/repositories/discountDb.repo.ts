'use strict';

import DiscountModel from '../models/discount.model';
import {
   convertToObjectIdMongo,
   selectDataObject,
   unSelectDataObject,
} from '../../../webserver/utils';

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

   const findAllDiscountUnSelect = async ({
      limit = 50,
      page = 1,
      sort = 'ctime',
      filter,
      unSelect,
      model,
   }: {
      page: string | number;
      limit: string | number;
      sort: string;
      filter: any;
      unSelect: string[];
      model: any;
   }) => {
      const skip = (+page - 1) * +limit;
      const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
      const discounts = await model
         .find(filter)
         .sort(sortBy)
         .skip(skip)
         .limit(limit)
         .select(unSelectDataObject(unSelect))
         .lean();

      return discounts;
   };

   const findAllDiscountSelect = async ({
      limit = 50,
      page = 1,
      sort = 'ctime',
      filter,
      select,
      model,
   }) => {
      const skip = (page - 1) * limit;
      const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
      const discounts = await model
         .find(filter)
         .sort(sortBy)
         .skip(skip)
         .limit(limit)
         .select(selectDataObject(select))
         .lean();

      return discounts;
   };

   return {
      createDiscount,
      findOneDiscount,
      findAllDiscountUnSelect,
      findAllDiscountSelect,
   };
}
