const express = require('express')
const router = express.Router()
const redisController = require('../../controllers/redis.controller')

router.get('/', redisController.redisTest)

// router
module.exports = router