'use strict';

import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const DOCUMENT_NAME: string = 'Product';
const COLLECTION_NAME: string = 'Products';

const productSchema = new Schema(
   {
      productName: {
         // tên sản phẩm
         type: String,
         required: true,
      },
      productThumb: {
         type: String,
         required: true,
      },
      productDescription: {
         type: String,
      },
      productSlug: String, // ten-san-pham
      productPrice: {
         type: Number,
         required: true,
      },
      productQuantity: {
         type: Number,
         required: true,
      },
      productType: {
         type: String,
         required: true,
         enum: ['Electronics', 'Furniture', 'Clothing'],
      },
      productShop: {
         type: Schema.Types.ObjectId,
         ref: 'Shop',
      },
      productAttributes: {
         type: Schema.Types.Mixed,
         required: true,
      },
      //more
      productRatingAvg: {
         type: Number,
         default: 4.5,
         min: [1, 'Rating must be at least 1'],
         max: [5, 'Rating must be at most 5'],
         // 4.34565656 => 4.3
         set: (val) => Math.round(val * 10) / 10,
      },
      productVariations: {
         type: Array,
         default: [],
      },
      isDraft: {
         type: Boolean,
         default: true,
         index: true,
         select: false, // select: hide this field
      },
      isPublish: {
         type: Boolean,
         default: false,
         index: true,
         select: false,
      },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
);
// Create index for search
productSchema.index({ productName: 'text', productDescription: 'text' });
// Document middleware - runs before .save() and .create()
productSchema.pre('save', function (next) {
   this.productSlug = slugify(this.productName, { lower: true });
   next();
});

// Define the product type = clothing
const clothingSchema = new Schema(
   {
      brand: {
         type: String,
         required: true,
      },
      size: { type: String },
      material: { type: String },
      productShop: {
         type: Schema.Types.ObjectId,
         ref: 'Shop',
      },
   },
   {
      collection: 'Clothes',
      timestamps: true,
   }
);
// Define the product type = electronics
const electronicSchema = new Schema(
   {
      manufacturer: {
         type: String,
         required: true,
      },
      model: { type: String },
      color: { type: String },
      productShop: {
         type: Schema.Types.ObjectId,
         ref: 'Shop',
      },
   },
   {
      collection: 'Electronics',
      timestamps: true,
   }
);

// Define the product type = furniture
const furnitureSchema = new Schema(
   {
      brand: {
         type: String,
         required: true,
      },
      size: { type: String },
      material: { type: String },
      productShop: {
         type: Schema.Types.ObjectId,
         ref: 'Shop',
      },
   },
   {
      collection: 'Furniture',
      timestamps: true,
   }
);

//Export the model
export const ProductModel = model(DOCUMENT_NAME, productSchema);
export const ClothingModel = model('Clothing', clothingSchema);
export const ElectronicModel = model('Electronic', electronicSchema);
export const FurnitureModel = model('Furniture', furnitureSchema);
