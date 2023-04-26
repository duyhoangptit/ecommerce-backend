const express = require('express')
const router = express.Router()
const discountController = require('../../controllers/discount.controller')
const {authenticationV2} = require("../../auth/authUtils");

// authentication
router.use(authenticationV2)

/**
 * 1. Generator discount code [Shop | Admin]
 * 2. Get all discount codes [User | Shop]
 * 3. Get all product by discount code [User]
 * 4. Get discount amount [User]
 * 5. Delete discount Code [Admin | Shop]
 * 6. Cancel discount Code [Code]
 */
router.get('/search/:keySearch', discountController.searchProducts)

// router
module.exports = router