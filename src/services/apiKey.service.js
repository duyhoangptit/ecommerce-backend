const apiKeyModel = require("../models/apikey.model")

const findById = async (key) => {
    return await apiKeyModel.findOne({key, status: true}).lean();
}

module.exports = {
    findById
}