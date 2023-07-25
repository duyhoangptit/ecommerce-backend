'use strict';
const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';
// Declare the Schema of the Mongo model
let keyTokenSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'Shop',
      },
      publicKey: {
         type: String,
         required: true,
      },
      refreshToken: {
         type: Array,
         default: [],
      },
      //* Level 0, 1, 2
      // privateKey: {
      //    type: String,
      //    required: true,
      // },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);

//Export the model
export default model(DOCUMENT_NAME, keyTokenSchema);
