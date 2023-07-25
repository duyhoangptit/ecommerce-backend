'use strict';

import ShopModel from '../models/shop.model';

export default function shopDbRepoImpl() {
   const createShop = (payload) => {
      const { name, email, password, roles } = payload;
      return ShopModel.create({
         name,
         email,
         password,
         roles,
      });
   };

   const findShop = (email) => ShopModel.findOne({ email }).lean();

   return {
      createShop,
      findShop,
   };
}
