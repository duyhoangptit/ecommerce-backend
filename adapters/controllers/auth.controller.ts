'use strict';

import { NextFunction, Response } from 'express';
import { IRequest } from '../../config/interfaces/express.interface';
import {
   CREATED,
   OK,
} from '../../frameworks/webserver/middlewares/success.response';

import signup from '../../application/use_cases/auth/signup';
import login from '../../application/use_cases/auth/login';
import logout from '../../application/use_cases/auth/logout';
import handleRefreshToken from '../../application/use_cases/auth/handleRefreshToken';

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
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Register successfully',
         metadata: await signup(req.body, shopDb, keyTokenDb, authService),
      });
   };

   const loginUser = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Login successfully',
         metadata: await login(req.body, shopDb, keyTokenDb, authService),
      });
   };

   const logoutUser = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Logout successfully',
         metadata: await logout(req.keyStore, keyTokenDb),
      });
   };

   const handleRefreshTokenUser = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Get new token successfully',
         metadata: await handleRefreshToken(
            {
               refreshToken: req.refreshToken,
               user: req.user,
               keyStore: req.keyStore,
            },
            shopDb,
            keyTokenDb,
            authService
         ),
      });
   };

   return { signupUser, loginUser, logoutUser, handleRefreshTokenUser };
}
