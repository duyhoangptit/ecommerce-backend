const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const {authentication} = require("../../auth/authUtils");

// authentication
router.use(authentication)

// product
router.post('', productController.createProduct)

// router
module.exports = router