import ApikeyModel from '../models/apikey.model';

export default function apikeyDbReposImpl() {
   const findById = (key) => {
      return ApikeyModel.findOne({ key, status: true }).lean();
   };

   return {
      findById,
   };
}
