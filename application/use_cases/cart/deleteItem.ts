'use strict';

export default async function deleteItem(cartDb, { userId, productId }) {
   return await cartDb.deleteUserItemCart({ userId, productId });
}
