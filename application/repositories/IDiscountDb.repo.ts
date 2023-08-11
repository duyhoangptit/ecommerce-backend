'use strict';

export default function discountDbRepo(repo) {
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
      repo.createDiscount({
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
      });

   const findOneDiscount = (filter) => repo.findOneDiscount(filter);

   return {
      createDiscount,
      findOneDiscount,
   };
}
