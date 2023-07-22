import { Application } from 'express';
import { createTerminus } from '@godaddy/terminus';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4090;
const IP = process.env.IP;
const TIME_SHUTDOWN =
   process.env.TIME_SHUTDOWN || process.env.NODE_ENV === 'production'
      ? 15000
      : 3000;

export default (app: Application, mongoose: any, serverInit: any) => {
   function healthCheck() {
      // CHECK_CONNECT_TO_MONGODB

      // ERROR
      if (
         mongoose.connection.readyState === 0 ||
         mongoose.connection.readyState === 3
      )
         return Promise.reject(new Error('MongoDB has disconnected'));

      // CONNECTING
      if (mongoose.connection.readyState === 2)
         return Promise.reject(new Error('MongoDB is connecting'));

      // CONNECTED
      return Promise.resolve('MongoDB is connected');
   }

   function onSignal() {
      console.log('Server is starting cleanup');
      return new Promise((resolve, reject) => {
         mongoose
            .disconnect(false)
            .then(() => {
               console.info('Mongoose has disconnected');
               resolve(1);
            })
            .catch(reject);
      });
   }

   function beforeShutdown() {
      return new Promise((resolve) => {
         setTimeout(resolve, TIME_SHUTDOWN);
      });
   }

   function onShutdown() {
      return new Promise(() =>
         console.log('Cleanup finished, server is shutting down')
      );
   }

   function startServer() {
      createTerminus(serverInit, {
         logger: console.log,
         signal: 'SIGINT',
         healthChecks: {
            '/healthcheck': healthCheck,
         },
         onSignal,
         onShutdown,
         beforeShutdown,
      }).listen(PORT, IP, () => {
         console.log(
            'Express server listening on %d, in %s mode',
            PORT,
            app.get('env')
         );
      });
   }

   return {
      startServer,
   };
};
