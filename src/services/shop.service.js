const shopModel = require('../models/shop.model')

const findByEmail = async ({
                               email,
                               select = {
                                   email: 1, password: 2, status: 1, roles: 1
                               }
                           }) => {

    return await shopModel.findOne({email}).select(select).lean();
}

module.exports = {
    findByEmail
}