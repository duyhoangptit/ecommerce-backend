const {BusinessLogicError, Api404Error} = require("../core/error.response");
const {checkEmailToken, newOtp} = require("./otp.service");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const i18n = require("../configs/config.i18n");
const {createTokenPair} = require("../auth/authUtils");
const apiKeyModel = require("../models/apikey.model");
const {getInfoData} = require("../utils");
const uuid = require("uuid");
const EmailService = require('./email.service')

class UserService {

    registerUser = async ({
        email = null,
        captcha = null
                          }) => {
        // 1 check email exists in dbs
        const user = await userModel.findOne({email}).lean()

        // 2. if exists
        if (user) {
            return new BusinessLogicError('Email already exists')
        }

        // 3. send token via email user
        const result = await this.sendEmailToken({
            email
        })

        return 'OK'
    }

    sendEmailToken = async ({email}) => {
        // get token
        const token = await newOtp({email})

        console.log('token::', token)

        // get template
        const template = await this.getTemplate({
            code: 'HTML_EMAIL_REGISTER'
        })

        if (!template) {
            throw new Api404Error('Template not found')
        }

        const contentEmail = this.replacePlaceholder(
            template.tem_html,
            {
                link_verify: ''
            }
            )
        // send email
        await new EmailService(email, '').sendEmailLinkVerify({
            html: contentEmail,
            toEmail: email,
            subject: 'Verify register user'
        })

        return 'OK'
    }

    replacePlaceholder = async ({}) => {

    }

    getTemplate = async ({code}) => {
        return {

        }
    }

    checkLoginEmailToken = async ({token}) => {
        try {
            // check token in model otp
            const {otp_email: email, otp_token} = await checkEmailToken(token)

            if (!email) {
                throw new BusinessLogicError('Token not found')
            }
            // check email exists in user model
            const foundUser = this.findUserByEmail(email)
            if (foundUser) throw new BusinessLogicError('Email already exists')

            const passwordHash = await bcrypt.hash(email, 10)

            const newUser = await userModel.create({
                usr_id: uuid(),
                usr_slug: 'xxxx',
                usr_email: email,
                usr_password: passwordHash,
                usr_salt: 10,

            })

            if (!newUser) {
                return null
            }

            // create private key, public key
            const {
                publicKey,
                privateKey,
            } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
            });
            console.log(privateKey, '---', publicKey)

            const publicKeyString = await KeyTokenService.createKeyToken({
                userId: newUser.usr_id,
                publicKey: publicKey.toString(),
                privateKey: privateKey.toString(),
            })

            if (!publicKeyString) {
                throw new BusinessLogicError(i18n.translate('messages.error005'))
            }
            console.log('publicKeyString:: ', publicKeyString)

            // create pub
            const publicKeyObject = await crypto.createPublicKey(publicKeyString)
            console.log('publicKeyObject:: ', publicKeyObject)

            // created token pair
            const tokens = await createTokenPair(
                {
                    userId: newUser.usr_id,
                    email
                },
                publicKeyObject,
                privateKey
            )

            console.log('Created token success:: ', tokens)
            // apiKey
            const newKey = await apiKeyModel.create({
                key: crypto.randomBytes(64).toString('hex'), permission: ['0000']
            })

            return {
                shop: getInfoData(
                    {
                        fields: ['usr_id', 'usr_email', 'usr_phone'],
                        object: newUser
                    }
                ),
                tokens,
                key: getInfoData(
                    {
                        fields: ['key'],
                        object: newKey
                    })
            }
        } catch (e) {
            throw e
        }
    }

    findUserByEmail = async ({email}) => {
        return userModel.findOne({usr_email: email}).lean();
    }

}

module.exports = new UserService()
