import { Application } from 'express';

export default function routes(app: Application, express) {
   app.use('/api/v1', (req, res) => {
      res.json({ status: 'OK' });
   });
}
