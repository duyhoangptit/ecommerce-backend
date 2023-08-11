import { Api400Error } from '../../../frameworks/webserver/middlewares/error.response';
import discount from '../../../src/entities/discount';

export default async function createDiscount(discountDb, payload) {
   const {
      code,
      startDate,
      endDate,
      isActive,
      shopId,
      minOrderValue,
      productIds,
      appliesTo,
      name,
      description,
      type,
      value,
      maxValue,
      maxUses,
      usesCount,
      maxUsesPerUser,
      usersUsed,
   } = payload;

   if (new Date() > new Date(startDate) || new Date() > new Date(endDate))
      throw new Api400Error('Discount time must greater than current date!');

   if (new Date(startDate) > new Date(endDate))
      throw new Api400Error('Start date must be before end date!');

   // Create index for discount
   const foundDiscount = await discountDb.findOneDiscount({
      discountCode: code,
      shopId,
   });

   //? Using chain expression instead of if else
   if (foundDiscount?.discountIsActive)
      throw new Api400Error('Discount code already exists!');

   const newDiscountEntity = discount(
      code,
      startDate,
      endDate,
      isActive,
      shopId,
      minOrderValue,
      productIds,
      appliesTo,
      name,
      description,
      type,
      value,
      maxValue,
      maxUses,
      usesCount,
      maxUsesPerUser,
      usersUsed
   );

   const newDiscount = await discountDb.createDiscount(newDiscountEntity);

   return newDiscount;
}
