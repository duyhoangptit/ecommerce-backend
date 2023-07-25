'use strict';

import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default function authService() {
   const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
   };

   const generateKeyPair = () => {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
         modulusLength: 4096,
         publicKeyEncoding: {
            type: 'pkcs1', // public key cryptography standards 1
            format: 'pem', // pem - privacy enhanced mail
         },
         privateKeyEncoding: {
            type: 'pkcs1', // public key cryptography standards 1
            format: 'pem', // pem - privacy enhanced mail
         },
      });

      return { privateKey, publicKey };
   };

   const createTokenPair = async (payload, publicKey, privateKey) => {
      try {
         // accessToken
         const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: '2 days',
            algorithm: 'RS256',
         });

         const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days',
            algorithm: 'RS256',
         });

         //

         JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
               console.error(`error verify::`, err);
            } else {
               console.log(`decode verify::`, decode);
            }
         });
         return { accessToken, refreshToken };
      } catch (error) {
         console.error(error);
         return error.message;
      }
   };

   return { hashPassword, createTokenPair, generateKeyPair };
}
