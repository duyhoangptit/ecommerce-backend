const JWT = require('jsonwebtoken')
const catchAsync = require('../helpers/catch.async')
const {Api403Error, Api404Error, Api401Error} = require("../core/error.response");
const KeyTokenService = require('../services/keyToken.service')
const {ignoreWhiteList} = require('./checkAuth')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    REFRESH_TOKEN: 'refresh-token',
    X_CLIENT_ID: 'x-client-id',
    BEARER: 'Bearer '
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // auth token
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1 days'
        })

        // refresh token
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        // verify key
        verifyJwt(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify:: `, err)
            } else {
                console.log('decode verify::', decode)
            }
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.error(`createTokenPair error:: `, error)
    }
}
/**
 * 1. Check userId missing
 * 2. Get accessToken
 * 3. verifyToken
 * 4. Check user in dbs
 * 5. check key store with this userId
 * 6. OK all => return next()
 * @type {(function(*, *, *): void)|*}
 */
const authentication = catchAsync(async (req, res, next) => {
    if (ignoreWhiteList(req)) return next()

    // 1. get auth token
    const clientId = req.headers[HEADER.X_CLIENT_ID]
    const accessToken = extractToken(req.headers[HEADER.AUTHORIZATION])
    if (!accessToken) throw new Api401Error('Invalid request')

    // 2. check user id
    const obj = parseJwt(accessToken)
    if (!obj.userId) throw new Api403Error('Invalid request')

    // 2. check keyStore by userId
    const userId = clientId || obj.userId
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) throw new Api404Error('Resource not found')

    // 4.
    try {
        const decodeUser = verifyJwt(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) return next(new Api401Error('Invalid userId'))

        req.keyStore = keyStore
        next()
    } catch (error) {
        throw error
    }
})

const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const authenticationV2 = catchAsync(async (req, res, next) => {
    if (ignoreWhiteList(req)) return next()

    const clientId = req.headers[HEADER.X_CLIENT_ID]
    const refreshToken = extractToken(req.headers[HEADER.REFRESH_TOKEN])
    const accessToken = extractToken(req.headers[HEADER.AUTHORIZATION])

    // 1. check user id
    const obj = parseJwt(accessToken || refreshToken)
    if (!obj.userId) return next(new Api403Error('Invalid request'))

    // 2. check user id
    const userId = clientId || obj.userId
    if (!userId) return next(new Api403Error('Invalid request'))

    // 2. check keyStore by userId
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) return next(new Api404Error('Resource not found'))

    // 3. get refreshToken
    if (refreshToken) {
        try {
            const decodeUser = verifyJwt(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId) return next(new Api401Error('Invalid userId'))

            req.user = decodeUser
            req.keyStore = keyStore
            req.refreshToken = refreshToken

            return next()
        }  catch (error) {
            throw error
        }
    }

    // 3. get auth token
    if (!accessToken) return next(new Api403Error('Invalid request'))

    // 4.
    try {
        const decodeUser = verifyJwt(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) return next(new Api401Error('Invalid userId'))

        req.user = decodeUser
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJwt = (token, keySecret) => {
    return JWT.verify(token, keySecret);
}

const extractToken = (tokenHeader) => {
    if (!tokenHeader) return "";
    return tokenHeader.replace(HEADER.BEARER, '')
}

module.exports = {
    createTokenPair,
    authentication,
    authenticationV2,
    verifyJwt,
}
