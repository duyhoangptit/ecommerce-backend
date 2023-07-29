'use strict';

import { Types } from 'mongoose';
import KeyTokenModel from '../models/keyToken.model';

export default function keyTokenDbRepoImpl() {
   const createKeyToken = async ({ userId, publicKey, privateKey }) => {
      const filter = { user: userId },
         update = {
            publicKey,
            refreshTokensUsed: [],
            privateKey,
         },
         option = { upsert: true, new: true };
      const tokens = await KeyTokenModel.findOneAndUpdate(
         filter,
         update,
         option
      );

      return tokens ? tokens.publicKey : null;
   };

   const findByUserId = async (userId) =>
      await KeyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();

   const deleteKeyById = async (id) =>
      await KeyTokenModel.findByIdAndDelete(id).lean();

   return { createKeyToken, findByUserId, deleteKeyById };
}
