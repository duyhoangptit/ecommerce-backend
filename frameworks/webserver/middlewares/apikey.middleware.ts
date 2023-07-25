'use strict';

import { NextFunction, Request, Response } from 'express';
import { IApikeyRequest } from '../../../config/interfaces/express.interface';

const HEADERS = {
   API_KEY: 'x-api-key',
   AUTHORIZATION: 'authorization',
};
export default function apikeyAuth(apikeyDbRepo, apikeyDbRepoImpl) {
   const apiKeyDb = apikeyDbRepo(apikeyDbRepoImpl());

   const checkApiKey = async (
      req: IApikeyRequest,
      res: Response,
      next: NextFunction
   ) => {
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
         next();
      } catch (err) {
         console.log(err);
         return err;
      }
   };

   const permission = (permission) => {
      // Trả về 1 cái hàm mà hàm đó có thể sử dụng các biến của hàm cha
      return (req: IApikeyRequest, res: Response, next: NextFunction) => {
         try {
            if (!req.apikey.permissions) {
               return res.status(403).json({
                  message: 'Forbidden Error: API key',
                  code: 403,
               });
            }

            const validPermission = req.apikey.permissions.includes(permission);
            if (!validPermission) {
               return res.status(403).json({
                  message: 'Forbidden Error: API key',
                  code: 403,
               });
            }

            next();
         } catch (error) {
            console.log(error);
            return error;
         }
      };
   };

   return {
      checkApiKey,
      permission,
   };
}
