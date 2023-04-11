const express = require('express')
const {apiKey, permission} = require("../auth/checkAuth");
const router = express.Router()

router.use('/healthcheck', require('./health'))

// check apiKey
router.use(apiKey)

// check permission
router.use(permission('0000'))

// init routes
router.use('/api/v1/product', require('./product'))
router.use('/api/v1/auth', require('./auth'))

module.exports = router