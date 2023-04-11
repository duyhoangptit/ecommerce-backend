const express = require('express')
const router = express.Router()
const healthController = require('../../controllers/heath.controller')

/**
 * @swagger
 *   /healthcheck:
 *     get:
 *       summary: API check health of service
 *       tags: [Health]
 *       security: []
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: OK
 *           contents:
 *             application/json
 */
router.get('', healthController.healthcheck)

module.exports = router