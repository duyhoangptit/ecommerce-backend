'use strict';

import { SortOrder, Types } from 'mongoose';
import { ProductModel } from '../models/product.model';
import { selectDataObject, unSelectDataObject } from '../../../webserver/utils';
import { IProduct } from '../../../../src/entities/product';
import ApiFeatures from '../../../webserver/utils/api-feature.util';

export default function productDbRepoImpl() {
   // utils
   const queryProduct = async ({ query, limit, skip }) =>
      await ProductModel.find(query)
         .populate('productShop', 'name email -_id')
         .sort({ updateAt: -1 })
         .skip(skip)
         .limit(limit)
         .lean();
   //

   const createProduct = async ({ productId, payload, model }) => {
      return await model.create({ ...payload, _id: productId });
   };
   const findAllDraftsForShop = async ({ query, limit, skip }) => {
      return await queryProduct({ query, limit, skip });
   };

   const findAllPublishForShop = async ({ query, limit, skip }) => {
      return await queryProduct({ query, limit, skip });
   };

   const publishProductByShop = async ({ productShop, productId }) => {
      const [foundShop] = await Promise.all([
         ProductModel.findOne({
            productShop: new Types.ObjectId(productShop),
            _id: new Types.ObjectId(productId),
         }),
      ]);
      if (!foundShop) return null;

      foundShop.isPublish = true;
      foundShop.isDraft = false;

      const { modifiedCount } = await foundShop.updateOne(foundShop);

      return modifiedCount;
   };
   const unPublishProductByShop = async ({ productShop, productId }) => {
      const foundShop = await ProductModel.findOne({
         productShop: new Types.ObjectId(productShop),
         _id: new Types.ObjectId(productId),
      });
      if (!foundShop) return null;

      foundShop.isPublish = false;
      foundShop.isDraft = true;

      const { modifiedCount } = await foundShop.updateOne(foundShop);

      return modifiedCount;
   };

   const searchProductByUser = async ({ keySearch }) => {
      const regexSearch = new RegExp(keySearch);

      const results = await ProductModel.find(
         {
            isPublish: true,
            $text: { $search: regexSearch.toString() },
         },
         {
            score: { $meta: 'textScore' },
         }
      )
         .sort({ score: { $meta: 'textScore' } })
         .lean();

      return results;
   };

   const findAllProducts = async ({ limit, sort, page, filter, select }) => {
      const skip = (page - 1) * limit;
      const sortBy:
         | string
         | { [key: string]: SortOrder | { $meta: any } }
         | [string, SortOrder][] = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
      const products = await ProductModel.find(filter)
         .sort(sortBy)
         .skip(skip)
         .limit(limit)
         .select(selectDataObject(select))
         .lean();
      return products;
   };

   const findProduct = async ({ productId, unSelect }): Promise<IProduct> =>
      await ProductModel.findById(productId)
         .select(unSelectDataObject(unSelect))
         .lean();
   const updateProductById = async ({
      productId,
      payload,
      model,
      isNew = true,
   }) => {
      return await model.findByIdAndUpdate(productId, payload, {
         new: isNew,
      });
   };

   const checkProductByServer = async (products) => {
      return await Promise.all(
         products.map(async (product) => {
            const foundProduct = await findProduct({
               productId: product.productId,
               unSelect: '',
            });
            if (foundProduct)
               return {
                  price: foundProduct.productPrice,
                  quantity: product.quantity,
                  productId: product.productId,
               };
         })
      );
   };
   /**
    * ?productPrice[gte]=2&productQuantity[gt]=3&...[lte]=5&...[lt]=6&keySearch=abc
    *
    * @param queryInput
    * @return {Promise<void>}
    */
   const advancedSearch = async (queryInput) => {
      const features = new ApiFeatures(ProductModel.find(), queryInput)
         .filter()
         .sort()
         .limitFields()
         .paging();

      return await features.query;
   };

   return {
      findAllDraftsForShop,
      publishProductByShop,
      findAllPublishForShop,
      unPublishProductByShop,
      searchProductByUser,
      findAllProducts,
      updateProductById,
      createProduct,
      checkProductByServer,
      advancedSearch,
      findProduct,
   };
}
