import { NextFunction, Request, Response } from 'express';
import { IApikeyRequest } from '../../../config/typings';

const HEADERS = {
   API_KEY: 'x-api-key',
   AUTHORIZATION: 'authorization',
};
export default function apikeyAuth(apikeyRepository, apikeyRepositoryDb) {
   const apiKeyDb = apikeyRepository(apikeyRepositoryDb());

   const checkApiKey = async (
      req: IApikeyRequest,
      res: Response,
      next: NextFunction
   ): Promise<any> => {
      try {
         const key = req.headers[HEADERS.API_KEY];

         if (!key) {
            return res.status(403).json({
               message: 'Forbidden Error: API key',
               code: 403,
            });
         }

         const apiKey = await apiKeyDb.findById(key);

         if (!apiKey) {
            return res.status(401).json({
               message: 'Unauthorized Error: API key',
               code: 401,
            });
         }

         req.apikey = apiKey;
         return next(req.apikey);
      } catch (err) {
         return err;
      }
   };

   return {
      checkApiKey,
   };
}
