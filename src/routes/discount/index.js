const express = require('express')
const router = express.Router()
const discountController = require('../../controllers/discount.controller')
const {authenticationV2} = require("../../auth/authUtils");



/**
 * 1. Generator discount code [Shop | Admin]
 * 2. Get all discount codes [User | Shop]
 * 3. Get all product by discount code [User]
 * 4. Get discount amount [User]
 * 5. Delete discount Code [Admin | Shop]
 * 6. Cancel discount Code [Code]
 */

router.post('/amount', discountController.getDiscountAmount)
router.get('/list-product-code', discountController.getAllDiscountCodeWithProduct)

// authentication
router.use(authenticationV2)

router.get('', discountController.createDiscountCode)
router.get('', discountController.getAllDiscountCodesByShop)
router.get('/search/:keySearch', discountController.cancelDiscountCode)
router.get('/search/:keySearch', discountController.cancelDiscountCode)

// router
module.exports = router