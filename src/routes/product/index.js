const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const {authenticationV2} = require("../../auth/authUtils");

/**
 * @swagger
 *   /v1/api/product/search/{keySearch}:
 *     get:
 *       summary: Search product by key
 *       tags: [Products]
 *       security: []
 *       parameters:
 *         - in: path
 *           name: keySearch
 *           schema:
 *             type: string
 *           required: true
 *           description: key word search product
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.get('/search/:keySearch', productController.searchProducts)
/**
 * @swagger
 *   /v1/api/product/:
 *     get:
 *       summary: Search product by key
 *       tags: [Products]
 *       security: []
 *       parameters:
 *         - in: path
 *           name: keySearch
 *           schema:
 *             type: string
 *           required: true
 *           description: key word search product
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.get('/', productController.findAllProducts)
/**
 * @swagger
 *   /v1/api/product/{product_id}:
 *     get:
 *       summary: Search product by product_id
 *       tags: [Products]
 *       security: []
 *       parameters:
 *         - in: path
 *           name: keySearch
 *           schema:
 *             type: string
 *           required: true
 *           description: key word search product
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.get('/:product_id', productController.findProduct)


// authentication
router.use(authenticationV2)

// after auth
// product
/**
 * @swagger
 *   /v1/api/product:
 *     post:
 *       summary: Search product by key
 *       tags: [Products]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.post('', productController.createProduct)
/**
 * @swagger
 *   /v1/api/product/publish/{id}:
 *     put:
 *       summary: Update publish product
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: key word search product
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.put('/publish/:id', productController.publishProductByShop)

// query
/**
 * @swagger
 *   /v1/api/product/drafts/all:
 *     post:
 *       summary: Search product by key
 *       tags: [Products]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.get('/drafts/all', productController.getAllDraftsForShop)
/**
 * @swagger
 *   /v1/api/product/published/all:
 *     post:
 *       summary: Search product by key
 *       tags: [Products]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.get('/published/all', productController.getAllPublishedForShop)

// router
module.exports = router