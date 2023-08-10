import { Schema } from 'mongoose';

export interface IInventory {
   invenProductId: {
      type: Schema.Types.ObjectId;
      ref: 'Product';
   };
   invenLocation: {
      type: string;
      default: 'unKnown';
   };
   invenStock: {
      type: number;
      required: true;
   };
   invenShopId: { type: Schema.Types.ObjectId; ref: 'Shop' };
   invenReservations: { type: Array<Object | string>; default: [] };
}

export default function inventory(
   invenProductId,
   invenLocation,
   invenStock,
   invenShopId,
   invenReservations
) {
   return {
      getProductId: () => invenProductId,
      getLocation: () => invenLocation,
      getStock: () => invenStock,
      getShopId: () => invenShopId,
      getReservations: () => invenReservations,
   };
}
