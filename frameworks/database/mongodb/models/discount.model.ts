'use strict';

import { model, Schema } from 'mongoose';
import { IDiscount } from '../../../../src/entities/discount';

const COLLECTION_NAME = 'Discounts';
const DOCUMENT_NAME = 'Discount';

const discountSchema = new Schema<IDiscount>(
   {
      discountName: {
         type: String,
         required: true,
      },
      discountDescription: {
         type: String,
         required: true,
      },
      discountType: {
         type: String,
         enum: ['fixed_amount', 'percentage'],
         default: 'fixed_amount', // or percentage (theo tien, hay phan tram)
      },
      discountValue: {
         type: Number,
         required: true,
      },
      discountMaxValue: {
         type: Number,
      },
      discountCode: {
         type: String,
         required: true,
         unique: true,
      },
      discountStartDate: {
         type: Date,
         required: true,
      },
      discountEndDate: {
         type: Date,
         required: true,
      },
      // So luong discount duoc dung
      discountMaxUses: {
         type: Number,
         required: true,
      },
      // So discount da su dung
      discountUsesCount: {
         type: Number,
         required: true,
      },
      // Ai da dung
      discountUsersUsed: {
         type: Array,
         default: [],
      },
      // So luong cho phep toi da dc su dung cua moi user
      discountMaxUsesPerUser: {
         type: Number,
         required: true,
      },
      discountMinOrderValue: {
         type: Number,
         required: true,
      },
      discountShopId: {
         type: Schema.Types.ObjectId,
         ref: 'Shop',
      },
      discountIsActive: {
         type: Boolean,
         default: true,
      },
      discountAppliesTo: {
         type: String,
         required: true,
         enum: ['all', 'specific'],
      },
      // So san pham duoc ap dung
      discountProductIds: {
         type: Array,
         default: [],
      },
      // Con nhieu options:
      /**
       * 1. Cho chon su dung nhieu discount hay 1
       * 2. Chon khu vuc duoc su dung
       * 3. Giam gia theo cap: don hang tien cang cao, giam gia cang nhieu
       * 4. Nhac nho nguoi dung su dung discount trc khi qua muon
       * 5. Lich su ngay tao, ngay su dung, ngay sua doi
       */
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);

export default model(DOCUMENT_NAME, discountSchema);
