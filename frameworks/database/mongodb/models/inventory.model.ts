import { model, Schema } from 'mongoose';

const COLLECTION_NAME = 'Inventories';
const DOCUMENT_NAME = 'Inventory';

const inventorySchema = new Schema(
   {
      invenProductId: {
         type: Schema.Types.ObjectId,
         ref: 'Product',
      },
      invenLocation: {
         type: String,
         default: 'unKnown',
      },
      invenStock: {
         type: Number,
         required: true,
      },
      invenShopId: { type: Schema.Types.ObjectId, ref: 'Shop' },
      invenReservations: { type: Array, default: [] },
      /**
       * cartId
       * stock
       * createdOn
       */
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);

export default model(DOCUMENT_NAME, inventorySchema);
