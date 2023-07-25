'use strict';

import KeyTokenModel from '../models/keyToken.model';

export default function keyTokenDbRepoImpl() {
   const createKeyToken = (userId, publicKey) => {
      const tokens = KeyTokenModel.create({
         user: userId,
         publicKey,
      });

      return tokens ? tokens : null;
   };

   return { createKeyToken };
}
