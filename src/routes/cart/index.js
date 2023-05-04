const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cart.controller')
const {authenticationV2} = require("../../auth/authUtils");

// authentication
// router.use(authenticationV2)

router.post('', cartController.addToCart)
router.delete('', cartController.delete)
router.put('', cartController.update)
router.get('', cartController.listToCart)

// router
module.exports = router