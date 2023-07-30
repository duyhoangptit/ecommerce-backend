'use strict';

import ShopModel from '../models/shop.model';

type ItemType = {
   name: string;
   email: string;
   password: string;
   msisdn: string;
   roles: string[];
};

export default function shopDbRepoImpl() {
   const createShop = (payload: ItemType) => {
      const { name, email, password, roles, msisdn } = payload;
      return ShopModel.create({
         name,
         email,
         password,
         msisdn,
         roles,
      });
   };

   const findShop = (email: string) =>
      ShopModel.findOne({ email })
         .select({
            email: 1,
            password: 1,
            name: 1,
            status: 1,
            roles: 1,
         })
         .lean();

   return {
      createShop,
      findShop,
   };
}
