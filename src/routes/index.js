const express = require('express')
const {apiKey, permission} = require("../auth/checkAuth");
const router = express.Router()

// health check application
router.use('/healthcheck', require('./health'))

// check apiKey
router.use(apiKey)

// check permission
router.use(permission('0000'))

// init routes
router.use('/api/v1/cart', require('./cart'))
router.use('/api/v1/order', require('./order'))
router.use('/api/v1/discount', require('./discount'))
router.use('/api/v1/product', require('./product'))
router.use('/api/v1/comment', require('./comment'))
router.use('/api/v1/auth', require('./auth'))
router.use('/api/v1/user', require('./user'))

module.exports = router
