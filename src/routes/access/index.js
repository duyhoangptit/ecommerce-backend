const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const {authentication} = require("../../auth/authUtils");

// init routes
router.post('/shop/signin', accessController.login)
router.post('/shop/signup', accessController.signUp)

// authentication
router.use(authentication)

// logout
router.post('/shop/logout', accessController.logout)
router.post('/shop/refresh-token', accessController.refreshToken)

module.exports = router