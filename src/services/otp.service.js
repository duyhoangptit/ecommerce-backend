const bcrypt = require('bcrypt')
const _Otp = require('../models/otp.model')

let that = module.exports = {
    insertOtp: async ({
                          email,
                          otp
                      }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(otp, salt);
            //  key: String,
            //  otp: String,
            //  data: String,
            const otpRes = await _Otp.create({
                key: email,
                otp: hashOtp,
                data: JSON.stringify({email})
            });

            return otpRes ? 1 : 0;
        } catch (e) {
            console.log(e)
        }
    },
    verifyOtp: async ({
                          email,
                          otp
                      }) => {
        try {
            const otpHolder = await _Otp.find({
                email
            })

            if(!otpHolder) {
                return null
            }

            // get last otp
            const lastOtp = otpHolder[otpHolder.length - 1]
            const isValidOtp = await bcrypt.compare(otp, lastOtp.otp)

            return isValidOtp ? lastOtp.data : null
        } catch (e) {
            console.log(e)
        }
    }
}