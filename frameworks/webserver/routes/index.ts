'use strict';

import { Application } from 'express';

import apikeyAuth from '../middlewares/apikey.middleware';
import apikeyDbRepo from '../../../application/repositories/IApikeyDb.repo';
import apikeyDbRepoImpl from '../../database/mongodb/repositories/apikeyDb.repo';

import authRouter from './auth';

export default function routes(app: Application, express) {
   const apikeyMiddleware = apikeyAuth(apikeyDbRepo, apikeyDbRepoImpl);
   // check apikey
   app.use(apikeyMiddleware.checkApiKey);
   // check permissions
   app.use(apikeyMiddleware.permission('0000'));

   app.use('/api/v1/auth', authRouter(express));
   app.use('/api/v1', (req, res) => {
      res.json({ status: 'OK' });
   });
}
