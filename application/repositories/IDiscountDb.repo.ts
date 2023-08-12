'use strict';

export default function discountDbRepo(repo) {
   const createDiscount = (discountEntity) =>
      repo.createDiscount(discountEntity);

   const findOneDiscount = (filter) => repo.findOneDiscount(filter);

   const findAllDiscountUnSelect = ({
      limit,
      page,
      sort,
      filter,
      unSelect,
      model,
   }) =>
      repo.findAllDiscountUnSelect({
         limit,
         page,
         sort,
         filter,
         unSelect,
         model,
      });

   const findAllDiscountSelect = ({
      limit,
      page,
      sort,
      filter,
      select,
      model,
   }) =>
      repo.findAllDiscountSelect({
         limit,
         page,
         sort,
         filter,
         select,
         model,
      });

   return {
      createDiscount,
      findOneDiscount,
      findAllDiscountUnSelect,
      findAllDiscountSelect,
   };
}
