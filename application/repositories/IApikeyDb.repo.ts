export default function apikeyRepository(repo) {
   const findById = (key) => repo.findById(key);

   return {
      findById,
   };
}
