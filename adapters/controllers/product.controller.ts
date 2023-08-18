'use strict';

import { IRequest } from '../../config/interfaces/express.interface';
import { NextFunction, Response } from 'express';
import {
   CREATED,
   OK,
} from '../../frameworks/webserver/middlewares/success.response';
import ProductService from '../../application/services/product.service';

export default function productController(productDbRepo, productDbRepoImpl) {
   const productDb = productDbRepo(productDbRepoImpl());

   const createProduct = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      CREATED({
         res,
         message: 'Create product successfully',
         metadata: await ProductService.createProduct(req.body.productType, {
            ...req.body,
            productShop: req.user.userId,
         }),
      });
   };

   const publishProductByShop = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Update publish product successfully',
         metadata: await ProductService.publishProductByShop(productDb, {
            productShop: req.user.userId,
            productId: req.params.productId,
         }),
      });
   };

   const updateProduct = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Update product successfully',
         metadata: await ProductService.updateProduct(
            req.body.productType,
            req.params.productId,
            { ...req.body, productShop: req.user.userId }
         ),
      });
   };

   const getAllDraftsForShop = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Get list draft product successfully',
         metadata: await ProductService.findAllDraftsForShop(productDb, {
            productShop: req.user.userId,
         }),
      });
   };

   const getAllPublishedForShop = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Get list published product successfully',
         metadata: await ProductService.findAllPublishForShop(productDb, {
            productShop: req.user.userId,
         }),
      });
   };

   const searchProducts = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Search product successfully',
         metadata: await ProductService.searchProducts(productDb, {
            keySearch: req.params.keySearch,
         }),
      });
   };

   const findAllProducts = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Find all product successfully',
         metadata: await ProductService.findAllProducts(productDb, req.params),
      });
   };

   const findProduct = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Find one product successfully',
         metadata: await ProductService.findOneProduct(
            productDb,
            req.params.productId
         ),
      });
   };

   const advancedSearch = async (
      req: IRequest,
      res: Response,
      next: NextFunction
   ) => {
      OK({
         res,
         message: 'Advanced search product successfully',
         metadata: await ProductService.advancedSearch(productDb, req.query),
      });
   };

   return {
      createProduct,
      publishProductByShop,
      updateProduct,
      getAllDraftsForShop,
      getAllPublishedForShop,
      searchProducts,
      findAllProducts,
      findProduct,
      advancedSearch,
   };
}
