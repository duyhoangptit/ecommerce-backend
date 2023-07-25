'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const shopSchema = new Schema(
   {
      name: {
         type: String,
         trim: true,
         maxLength: 150,
      },
      email: {
         type: String,
         unique: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
      },
      msisdn: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         enum: ['active', 'inactive'],
         default: 'inactive',
      },
      verify: {
         type: Schema.Types.Boolean,
         default: false,
      },
      roles: {
         type: Array,
         default: [],
      },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);

export default model(DOCUMENT_NAME, shopSchema);
