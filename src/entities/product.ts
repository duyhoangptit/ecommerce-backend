'use strict';

import { Schema } from 'mongoose';

export interface IProduct {
   productName: {
      // tên sản phẩm
      type: string;
   };
   productThumb: {
      type: string;
   };
   productDescription: {
      type: string;
   };
   productSlug: string; // ten-san-pham
   productPrice: {
      type: number;
   };
   productQuantity: {
      type: number;
   };
   productType: {
      type: string;
      required: true;
      enum: ['Electronics', 'Furniture', 'Clothing'];
   };
   productShop: {
      type: Schema.Types.ObjectId;
      ref: 'Shop';
   };
   productAttributes: {
      type: Schema.Types.Mixed;
      required: true;
   };
   //more
   productRatingAvg: {
      type: number;
   };
   productVariations: {
      type: Array<object>;
      default: [];
   };
   isDraft: {
      type: boolean;
      default: true;
      index: true;
      select: false; // select: hide this field
   };
   isPublish: {
      type: boolean;
      default: false;
      index: true;
      select: false;
   };
   createdAt: NativeDate;
   updatedAt: NativeDate;
}

export default function product(
   name,
   thumb,
   desc,
   price,
   quantity,
   type,
   shop,
   attributes,
   ratingAvg,
   variations
) {
   return {
      getName: () => name,
      getThumb: () => thumb,
      getDesc: () => desc,
      getPrice: () => price,
      getQuantity: () => quantity,
      getType: () => type,
      getShop: () => shop,
      getAttributes: () => attributes,
      getRatingAvg: () => ratingAvg,
      getVariations: () => variations,
   };
}
