'use strict';

export default function apikeyDbRepo(repo) {
   const findById = (key) => repo.findById(key);

   return {
      findById,
   };
}
