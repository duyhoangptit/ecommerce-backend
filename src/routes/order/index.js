const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/order.controller')
const {authenticationV2} = require("../../auth/authUtils");



/**
 * 1. Create New Order [User]
 * 2. Query Orders [User]
 * 3. Query Order Using It's ID [User]
 * 4. Cancel Order [User]
 * 5. Update Order Status [Admin]
 */

router.post('review', orderController.checkoutReview)

router.post('order', orderController.checkoutReview)

// router
module.exports = router