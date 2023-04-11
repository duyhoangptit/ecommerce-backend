const cloudinary = require('cloudinary').v2;
const {cloudinaryConfig: {api_key, api_secret}} = require('./config')

// return https url setting secure: true
cloudinary.config({
    cloud_name: 'dhjksy2oy',
    // secure: true,
    api_key: api_key || '474538614261583',
    api_secret: api_secret || 'dZl8RfGQVNRRnHFPk5G8-NgDt5g'
})

// log the configuration
// console.log(cloudinary.config())
module.exports = cloudinary
