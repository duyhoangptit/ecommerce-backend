const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey}) => {
        try {
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })

            return tokens ? tokens.publicKey : null
        } catch (error) {
            console.error('createKeyToken::error::', error)
            throw error;
        }
    }
}

module.exports = KeyTokenService