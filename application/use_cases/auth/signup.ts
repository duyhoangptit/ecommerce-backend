'use strict';

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
   authService,
   lodashUtils
) {
   const { name, email, password } = payload;

   const holderShop = await shopDb.findShop(email).lean(); // lean() returns a original object JavaScript
   if (holderShop) {
      console.log(holderShop);
      return {
         code: '',
         message: 'Shop already registered!',
      };
   }

   const hashPassword = await authService.hashPassword(password);
   const newShop = await shopDb.createShop({
      name,
      email,
      password: hashPassword,
      roles: [RolesShop.SHOP],
   });

   if (newShop) {
      //* Level xxx
      // Create privateKey, publicKey
      const { privateKey, publicKey } = authService.generateKeyPair();

      const publicKeyDb = await keyTokenDb.createKeyToken({
         userId: newShop._id,
         publicKey,
      });
      if (!publicKeyDb) {
         return {
            code: '',
            message: 'publicKeyDb error!',
         };
      }
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
         code: 201,
         metadata: {
            shop: lodashUtils.filterData({
               data: newShop,
               fields: ['_id', 'name', 'email'],
            }),
            tokens,
         },
      };
   }

   return {
      code: 200,
      metadata: null,
   };
}
