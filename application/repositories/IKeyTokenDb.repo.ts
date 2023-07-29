'use strict';

export default function keyTokenDbRepo(repo) {
   const createKeyToken = (userId, publicKey) =>
      repo.createKeyToken(userId, publicKey);
   const findByUserId = (userId) => repo.findByUserId(userId);
   const deleteKeyById = (id) => repo.deleteKeyById(id);

   return { createKeyToken, findByUserId, deleteKeyById };
}
