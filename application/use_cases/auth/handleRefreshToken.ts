'use strict';

import {
   Api400Error,
   Api403Error,
} from '../../../frameworks/webserver/middlewares/error.response';

// CHECK REFRESH TOKEN USED
export default async function handleRefreshToken(
   payload,
   shopDb,
   keyTokenDb,
   authService
) {
   const { refreshToken, user, keyStore } = payload;
   const { userId, email } = user;

   // Check xem token da duoc su dung chua?
   if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await keyTokenDb.deleteKeyByUserId(userId);
      throw new Api403Error('Something wrong happened! Please re-login!');
   }

   if (keyStore.refreshToken !== refreshToken)
      throw new Api400Error('Invalid refresh token, shop not registered!');
   // Check userId
   const foundShop = await shopDb.findShop(email);
   if (!foundShop) throw new Api400Error('Shop not registered');

   // Create AT & RT
   const tokens = await authService.createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
   );

   // Update token
   await keyStore.updateOne({
      $set: { refreshToken: tokens.refreshToken },
      $addToSet: {
         refreshTokenUsed: refreshToken,
      },
   });

   return {
      user,
      tokens,
   };
}
