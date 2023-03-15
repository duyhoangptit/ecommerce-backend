const express = require('express')
const router = express.Router()
const apiKey = require('../../auth/checkAuth')
const accessController = require('../../controllers/access.controller')

 // init routes
router.post('/shop/signin', accessController.login)
router.post('/shop/signup', accessController.signUp)

module.exports = router