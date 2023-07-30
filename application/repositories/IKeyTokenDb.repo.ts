'use strict';

export default function keyTokenDbRepo(repo) {
   const createKeyToken = (userId, publicKey) =>
      repo.createKeyToken(userId, publicKey);
   const findByUserId = (userId) => repo.findByUserId(userId);
   const deleteKeyById = (id) => repo.deleteKeyById(id);
   const findByRefreshTokenUsed = (refreshToken) =>
      repo.findByRefreshTokenUsed(refreshToken);
   const findByRefreshToken = (refreshToken) =>
      repo.findByRefreshToken(refreshToken);
   const deleteKeyByUserId = (userId) => repo.deleteKeyByUserId(userId);

   return {
      createKeyToken,
      findByUserId,
      deleteKeyById,
      findByRefreshTokenUsed,
      findByRefreshToken,
      deleteKeyByUserId,
   };
}
