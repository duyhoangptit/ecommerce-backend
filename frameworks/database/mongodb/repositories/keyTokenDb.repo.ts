'use strict';

import { Types } from 'mongoose';
import KeyTokenModel from '../models/keyToken.model';

export default function keyTokenDbRepoImpl() {
   const createKeyToken = async ({
      userId,
      publicKey,
      privateKey,
      refreshToken,
   }) => {
      const filter = { user: userId },
         update = {
            publicKey,
            refreshTokensUsed: [],
            privateKey,
            refreshToken,
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
      await KeyTokenModel.findOne({ user: new Types.ObjectId(userId) });

   const deleteKeyById = async (id) =>
      await KeyTokenModel.findByIdAndDelete(id).lean();

   const findByRefreshTokenUsed = async (refreshToken) =>
      await KeyTokenModel.findOne({
         refreshTokenUsed: refreshToken,
      }).lean();

   const findByRefreshToken = async (refreshToken) =>
      await KeyTokenModel.findOne({ refreshToken });

   const deleteKeyByUserId = async (userId) =>
      await KeyTokenModel.findOneAndDelete({ user: userId });

   return {
      createKeyToken,
      findByUserId,
      deleteKeyById,
      findByRefreshToken,
      findByRefreshTokenUsed,
      deleteKeyByUserId,
   };
}
