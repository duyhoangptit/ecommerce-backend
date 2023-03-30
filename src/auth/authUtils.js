const JWT = require('jsonwebtoken')
const catchAsync = require('../helpers/catch.async')
const {Api403Error, Api404Error, Api401Error} = require("../core/error.response");
const KeyTokenService = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESH_TOKEN: 'refresh-token'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
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
    // 1. check user id
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new Api403Error('Invalid request')

    // 2. check keyStore by userId
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) throw new Api404Error('Resource not found')

    // 3. get access token
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new Api401Error('Invalid request')

    // 4.
    try {
        const decodeUser = verifyJwt(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new Api401Error('Invalid userId')

        req.keyStore = keyStore
        next()
    } catch (error) {
        throw error
    }
})

const authenticationV2 = catchAsync(async (req, res, next) => {
    // 1. check user id
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new Api403Error('Invalid request')

    // 2. check keyStore by userId
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) throw new Api404Error('Resource not found')

    // 3. get refreshToken
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN]
    if (refreshToken) {
        try {
            const decodeUser = verifyJwt(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId) throw new Api401Error('Invalid userId')

            req.user = decodeUser
            req.keyStore = keyStore
            req.refreshToken = refreshToken

            return next()
        }  catch (error) {
            throw error
        }
    }

    // 3. get access token
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new Api401Error('Invalid request')

    // 4.
    try {
        const decodeUser = verifyJwt(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new Api401Error('Invalid userId')

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

module.exports = {
    createTokenPair,
    authentication,
    authenticationV2,
    verifyJwt,
}