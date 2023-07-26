'use strict';

import { NextFunction, Request, Response } from 'express';

import signup from '../../application/use_cases/auth/signup';
import { CREATED } from '../../frameworks/webserver/middlewares/success.response';

export default function authController(
   shopDbRepo,
   shopDbRepoImpl,
   keyTokenDbRepo,
   keyTokenDbRepoImpl,
   authServiceInterface,
   authServiceImpl
) {
   const shopDb = shopDbRepo(shopDbRepoImpl());
   const keyTokenDb = keyTokenDbRepo(keyTokenDbRepoImpl());
   const authService = authServiceInterface(authServiceImpl());

   const register = async (req: Request, res: Response, next: NextFunction) => {
      new CREATED({
         res,
         message: 'Register successfully',
         data: await signup(req.body, shopDb, keyTokenDb, authService),
      });
   };

   return { register };
}
