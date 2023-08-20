'use strict';

export default async function getUserCart(cartDb, userId) {
   return await cartDb.findCartByUserId(userId).lean();
}
