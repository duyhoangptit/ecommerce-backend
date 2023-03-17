const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const {authentication} = require("../../auth/authUtils");

// init routes
router.post('/shop/signin', accessController.login)
router.post('/shop/signup', accessController.signUp)

// authentication
router.use(authentication)
// logoout
router.post('/shop/logout', accessController.logout)

module.exports = router