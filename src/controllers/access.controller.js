const accessService = require('../services/access.service')
const catchAsync = require('../utils/catch.async')
const {CREATED} = require("../core/success.response");

class AccessController {
    signUp = catchAsync(async (req, res, next) => {
        next(CREATED(res, "Register success", await accessService.signUp(req.body)))
    })
}

module.exports = new AccessController()