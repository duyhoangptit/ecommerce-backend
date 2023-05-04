const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const {authenticationV2} = require("../../auth/authUtils");

/**
 * @swagger
 *   /api/v1/auth/login:
 *     post:
 *       summary: Shop login
 *       tags: [Auth]
 *       security: [{apiKey: []}]
 *       consumes:
 *       - application/json
 *       produces:
 *       - application/json
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         required: true
 *         description: The request login
 *         schema:
 *            $ref: '#/components/schemas/RequestLogin'
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
 *   /api/v1/auth/register:
 *     post:
 *       summary: Register shop
 *       tags: [Auth]
 *       consumes:
 *       - application/json
 *       produces:
 *       - application/json
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         required: true
 *         description: The request register
 *         schema:
 *            $ref: '#/components/schemas/RequestRegister'
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
 *   /api/v1/auth/logout:
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
 *   /api/v1/auth/refresh-token:
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