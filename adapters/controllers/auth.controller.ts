'use strict';

import { NextFunction, Request, Response } from 'express';

import signup from '../../application/use_cases/auth/signup';

export default function authController(
   shopDbRepo,
   shopDbRepoImpl,
   keyTokenDbRepo,
   keyTokenDbRepoImpl,
   authServiceInterface,
   authServiceImpl,
   lodashUtils
) {
   const shopDb = shopDbRepo(shopDbRepoImpl());
   const keyTokenDb = keyTokenDbRepo(keyTokenDbRepoImpl());
   const authService = authServiceInterface(authServiceImpl());

   const register = async (req: Request, res: Response, next: NextFunction) => {
      signup(req.body, shopDb, keyTokenDb, authService, lodashUtils)
         .then((tokens) => res.json(tokens))
         .catch((err) => next(err));
   };

   return { register };
}
