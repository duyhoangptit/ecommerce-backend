'use strict';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

class MongoDBConnect {
   constructor() {
      this.connect();
   }

   connect(type = 'mongodb') {
      if (process.env.NODE_ENV === 'development') {
         mongoose.set('debug', true);
         mongoose.set('debug', { color: true });
      }

      mongoose
         .connect(MONGO_URI, {
            maxPoolSize: 100,
         })
         .then(() => {})
         .catch((err) => console.log('Error connecting database: ' + err));

      mongoose.connection.on('connected', () => {
         console.info('Connected to MongoDB!');
      });

      mongoose.connection.on('reconnected', () => {
         console.info('MongoDB reconnected!');
      });

      mongoose.connection.on('error', (error) => {
         console.error(`Error in MongoDb connection: ${error}`);
         mongoose.disconnect();
      });

      mongoose.connection.on('disconnected', () => {
         console.error(
            `MongoDB disconnected! Reconnecting in ${10000 / 1000}s...`
         );
         setTimeout(() => this.connect(), 10000);
      });
   }

   static getInstance() {
      let instance = new MongoDBConnect();
      if (!instance) instance = new MongoDBConnect();

      return instance;
   }
}

const instanceMongoDb = MongoDBConnect.getInstance();
export default instanceMongoDb;
