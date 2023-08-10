import { Schema } from 'mongoose';

export interface IDiscount {
   discountName: {
      type: string;
      required: true;
   };
   discountDescription: {
      type: string;
      required: true;
   };
   discountType: {
      type: string;
      enum: ['fixed_amount', 'percentage'];
      default: 'fixed_amount'; // or percentage (theo tien, hay phan tram)
   };
   discountValue: {
      type: number;
      required: true;
   };
   discountCode: {
      type: string;
      required: true;
      unique: true;
   };
   discountStartDate: {
      type: Date;
      required: true;
   };
   discountEndDate: {
      type: Date;
      required: true;
   };
   // So luong discount duoc dung
   discountMaxUses: {
      type: number;
      required: true;
   };
   // So discount da su dung
   discountUsesCount: {
      type: number;
      required: true;
   };
   // Ai da dung
   discountUsersUsed: {
      type: Array<Schema.Types.ObjectId | string>;
      default: [];
   };
   // So luong cho phep toi da dc su dung cua moi user
   discountMaxUsesPerUser: {
      type: number;
      required: true;
   };
   discountMinOrderValue: {
      type: number;
      required: true;
   };
   discountShopId: {
      type: Schema.Types.ObjectId;
      ref: 'Shop';
   };
   discountIsActive: {
      type: boolean;
      default: true;
   };
   discountApplies: {
      type: string;
      required: true;
      enum: ['all', 'specific'];
   };
   // So san pham duoc ap dung
   discountProductIds: {
      type: Array<Schema.Types.ObjectId | string>;
      default: [];
   };
}

export default function discount(
   discountName,
   discountDescription,
   discountType,
   discountValue,
   discountCode,
   discountStartDate,
   discountEndDate,
   // So luong discount duoc dung
   discountMaxUses,
   // So discount da su dung
   discountUsesCount,
   // Ai da dung
   discountUsersUsed,
   // So luong cho phep toi da dc su dung cua moi user
   discountMaxUsesPerUser,
   discountMinOrderValue,
   discountShopId,
   discountIsActive,
   discountApplies,
   // So san pham duoc ap dung
   discountProductIds
) {
   return {
      getName: () => discountName,
      getDescription: () => discountDescription,
      getType: () => discountType,
      getValue: () => discountValue,
      getCode: () => discountCode,
      getStartDate: () => discountStartDate,
      getEndDate: () => discountEndDate,
      getMaxUses: () => discountMaxUses,
      getUsesCount: () => discountUsesCount,
      getUsersUsed: () => discountUsersUsed,
      getMaxUsesPerUser: () => discountMaxUsesPerUser,
      getMinOrderValue: () => discountMinOrderValue,
      getShopId: () => discountShopId,
      getIsActive: () => discountIsActive,
      getApplies: () => discountApplies,
      getProductIds: () => discountProductIds,
   };
}
