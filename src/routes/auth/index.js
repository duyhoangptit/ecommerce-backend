const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const {authenticationV2} = require("../../auth/authUtils");

/**
 * @swagger
 *   /v1/api/auth/login:
 *     post:
 *       summary: Shop login
 *       tags: [Auth]
 *       security: []
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.post('/login', accessController.login)
/**
 * @swagger
 *   /v1/api/auth/register:
 *     post:
 *       summary: Register shop
 *       tags: [Auth]
 *       security: []
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.post('/register', accessController.signUp)

// authentication
router.use(authenticationV2)

/**
 * @swagger
 *   /v1/api/auth/logout:
 *     post:
 *       summary: Shop logout
 *       tags: [Auth]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: Logout successful
 *           contents:
 *             application/json
 */
router.post('/logout', accessController.logout)
/**
 * @swagger
 *   /v1/api/auth/refresh-token:
 *     post:
 *       summary: Register shop
 *       tags: [Auth]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.post('/refresh-token', accessController.refreshToken)

module.exports = router