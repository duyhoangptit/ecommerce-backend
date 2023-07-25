'use strict';

export default function keyTokenDbRepo(repo) {
   const createKeyToken = (userId, publicKey) =>
      repo.createKeyToken(userId, publicKey);
   return { createKeyToken };
}
