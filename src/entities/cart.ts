import { Schema } from 'mongoose';

export interface ICart {
   cartState: {
      type: string;
      required: true;
      enum: ['active', 'completed', 'failed', 'pending'];
      default: 'active';
   };
   cartProducts: {
      type: Array<Schema.Types.ObjectId | string | object>;
      required: true;
      default: [];
   };

   cartCountProduct: {
      type: number;
      default: 0;
   };
   cartUserId: {
      type: number;
      required: true;
   };
}
