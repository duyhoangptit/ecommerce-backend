'use strict';

import { convertToObjectIdMongo } from '@frameworks/webserver/utils';
import { InventoryModel } from '../models/inventory.model';
import { Types } from 'mongoose';

export default function inventoryDbRepoImpl() {
   const insertInventory = ({
      productId,
      shopId,
      stock,
      location = 'unknown',
   }) =>
      InventoryModel.create({
         invenProductId: new Types.ObjectId(productId),
         invenShopId: new Types.ObjectId(shopId),
         invenStock: stock,
         invenLocation: location,
      });

   // Tru so luong trong kho
   const reservationInventory = ({ productId, quantity, cartId }) => {
      const query = {
            invenProductId: convertToObjectIdMongo(productId),
            invenStock: { $gte: quantity },
         },
         updateSet = {
            $inc: { invenStock: -quantity },
            $push: {
               invenReservations: {
                  quantity,
                  cartId,
                  createdOn: new Date(),
               },
            },
         },
         options = {
            upsert: true,
            new: true,
            returnNewDocument: true,
         };

      return InventoryModel.updateOne(query, updateSet, options);
   };

   const updateStock = ({ shopId, productId, stock, location }) => {
      const query = {
            invenShopId: shopId,
            invenProductId: productId,
         },
         updateSet = {
            $inc: {
               invenStock: stock,
            },
            $set: {
               invenLocation: location,
            },
         },
         options = { upsert: true, new: true };

      return InventoryModel.findOneAndUpdate(query, updateSet, options);
   };

   return {
      insertInventory,
      reservationInventory,
      updateStock,
   };
}
