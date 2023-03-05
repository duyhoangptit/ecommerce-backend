const JWT = require('jsonwebtoken')

const createTokenPair = async ( payload, publicKey, privateKey) => {
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
        JWT.verify(accessToken, publicKey, (err, decode) => {
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

module.exports = {createTokenPair}