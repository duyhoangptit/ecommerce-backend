const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const {authenticationV2} = require("../../auth/authUtils");

// before auth
router.get('/search/:keySearch', productController.searchProducts)

// authentication
router.use(authenticationV2)

// after auth
// product
router.post('', productController.createProduct)
router.put('/publish/:id', productController.publishProductByShop)

// query
router.get('/drafts/all', productController.getAllDraftsForShop)
router.get('/published/all', productController.getAllPublishedForShop)

// router
module.exports = router