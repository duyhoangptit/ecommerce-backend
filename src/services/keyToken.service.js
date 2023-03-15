const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            // level0
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            //
            // return tokens ? tokens.publicKey : null

            // level xx
            const filter = {user: userId}, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = {upsert: true, new: true}

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            console.error('createKeyToken::error::', error)
            throw error;
        }
    }
}

module.exports = KeyTokenService