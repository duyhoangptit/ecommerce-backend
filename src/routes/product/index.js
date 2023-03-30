const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const {authenticationV2} = require("../../auth/authUtils");

// authentication
router.use(authenticationV2)

// product
router.post('', productController.createProduct)

// router
module.exports = router