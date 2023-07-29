'use strict';

import { Api400Error } from '../../../frameworks/webserver/middlewares/error.response';

export default async function logout(keyStore, keyTokenDb) {
   const delKey = await keyTokenDb.deleteKeyById(keyStore._id);
   if (!delKey) throw new Api400Error(`Invalid request`);

   return delKey;
}
