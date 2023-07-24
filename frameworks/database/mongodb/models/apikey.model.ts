const { model, Schema } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';

// Declare the Schema of the Mongo model
const apikeySchema = new Schema(
   {
      key: {
         type: String,
         required: true,
         unique: true,
      },
      status: {
         type: Boolean,
         default: true,
      },
      permissions: {
         type: [String],
         required: true,
         enum: ['0000', '1111', '2222'],
      },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
);

//Export the model
export default model(DOCUMENT_NAME, apikeySchema);
