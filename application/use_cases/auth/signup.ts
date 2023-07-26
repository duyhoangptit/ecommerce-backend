'use strict';

import {
   Api401Error,
   Api403Error,
} from '../../../frameworks/webserver/middlewares/error.response';
import { filterData } from '../../../frameworks/webserver/utils/filterData';

const RolesShop = {
   SHOP: '000',
   WRITER: '001',
   EDITOR: '002',
   ADMIN: '003',
};

export default async function signup(
   payload,
   shopDb,
   keyTokenDb,
   authService
) {
   const { name, email, password, msisdn } = payload;

   const holderShop = await shopDb.findShop(email).lean(); // lean() returns a original object JavaScript
   if (holderShop) {
      console.log(holderShop);
      throw new Api401Error('Shop already registered');
   }

   const hashPassword = await authService.hashPassword(password);
   const newShop = await shopDb.createShop({
      name,
      email,
      password: hashPassword,
      msisdn,
      roles: [RolesShop.SHOP],
   });

   if (newShop) {
      //* Level xxx
      // Create privateKey, publicKey
      const { privateKey, publicKey } = authService.generateKeyPair();

      const publicKeyDb = await keyTokenDb.createKeyToken({
         userId: newShop._id,
         publicKey,
         privateKey,
      });
      if (!publicKeyDb) throw new Api401Error('Create key token failed');
      // Create token pair
      const tokens = await authService.createTokenPair(
         { userId: newShop._id, email },
         publicKeyDb,
         privateKey
      );

      //* Level 0, 1, 2
      // Create privateKey, publicKey
      // const privateKey = crypto.randomBytes(64).toString('hex');
      // const publicKey = crypto.randomBytes(64).toString('hex');

      // const keyStore = await KeyTokenService.createKeyToken({
      //    userId: newShop._id,
      //    publicKey,
      //    privateKey,
      // });
      // if (!keyStore) {
      //    return {
      //       code: '',
      //       message: 'keyStore error!',
      //    };
      // }
      // Create token pair
      // const tokens = await createTokenPair(
      //    { userId: newShop._id, email },
      //    publicKey,
      //    privateKey
      // );

      return {
         shop: filterData({
            data: newShop,
            fields: ['_id', 'name', 'email'],
         }),
         tokens,
      };
   }

   return null;
}
