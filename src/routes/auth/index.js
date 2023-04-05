const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const {authenticationV2} = require("../../auth/authUtils");

// init routes
router.post('/signin', accessController.login)
router.post('/signup', accessController.signUp)

// authentication
router.use(authenticationV2)

// logout
router.post('/logout', accessController.logout)
router.post('/refresh-token', accessController.refreshToken)

module.exports = router