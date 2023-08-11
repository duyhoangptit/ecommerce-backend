'use strict';

export default function discountDbRepo(repo) {
   const createDiscount = (discountEntity) =>
      repo.createDiscount(discountEntity);

   const findOneDiscount = (filter) => repo.findOneDiscount(filter);

   return {
      createDiscount,
      findOneDiscount,
   };
}
