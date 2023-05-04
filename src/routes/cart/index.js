const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cart.controller')
const {authenticationV2} = require("../../auth/authUtils");

// authentication
router.use(authenticationV2)

// router
module.exports = router