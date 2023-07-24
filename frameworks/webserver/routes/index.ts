import { Application } from 'express';

import apikeyAuth from '../middlewares/apikey.middleware';
import apikeyRepository from '../../../application/repositories/IApikeyDb.repo';
import apikeyRepositoryDb from '../../database/mongodb/repositories/apikeyDb.repo';

export default function routes(app: Application, express) {
   const apikeyMiddleware = apikeyAuth(apikeyRepository, apikeyRepositoryDb);
   app.use(apikeyMiddleware.checkApiKey);

   app.use('/api/v1', (req, res) => {
      res.json({ status: 'OK' });
   });
}
