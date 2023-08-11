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
   discountMaxValue: {
      type: number;
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
   discountAppliesTo: {
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

export default function discount({
   name,
   description,
   type,
   value,
   code,
   startDate,
   endDate,
   // So luong discount duoc dung
   maxUses,
   // So discount da su dung
   usesCount,
   // Ai da dung
   usersUsed,
   // So luong cho phep toi da dc su dung cua moi user
   maxUsesPerUser,
   minOrderValue,
   shopId,
   isActive,
   appliesTo,
   // So san pham duoc ap dung
   productIds,
   maxValue,
}) {
   return {
      getName: () => name,
      getDescription: () => description,
      getType: () => type,
      getValue: () => value,
      getCode: () => code,
      getStartDate: () => startDate,
      getEndDate: () => endDate,
      getMaxUses: () => maxUses,
      getUsesCount: () => usesCount,
      getUsersUsed: () => usersUsed,
      getMaxUsesPerUser: () => maxUsesPerUser,
      getMinOrderValue: () => minOrderValue,
      getShopId: () => shopId,
      getIsActive: () => isActive,
      getAppliesTo: () => appliesTo,
      getProductIds: () => productIds,
      getMaxValue: () => maxValue,
   };
}
