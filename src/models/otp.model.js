const {Schema, model} = require('mongoose')

const DOCUMENT_NAME = 'Otp';
const COLLECTION_NAME = 'Otps';

const otpSchema = new Schema({
    key: String,
    otp: String,
    data: String,
    time: {type: Date, default: Date.now(), index: {expires: 60}} // 60s expire
}, {
  collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, otpSchema);