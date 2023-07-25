'use strict';

export default function shopDbRepo(repo) {
   const createShop = (payload) => repo.createShop(payload);
   const findShop = (email) => repo.findShop(email);

   return {
      createShop,
      findShop,
   };
}
