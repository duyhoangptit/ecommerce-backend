'use strict';

import { NextFunction, Request, Response } from 'express';

import {
   CREATED,
   OK,
} from '../../frameworks/webserver/middlewares/success.response';
import signup from '../../application/use_cases/auth/signup';
import login from '../../application/use_cases/auth/login';

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

   const signupUser = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Register successfully',
         data: await signup(req.body, shopDb, keyTokenDb, authService),
      });
   };

   const loginUser = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Login successfully',
         data: await login(req.body, shopDb, keyTokenDb, authService),
      });
   };

   return { signupUser, loginUser };
}
