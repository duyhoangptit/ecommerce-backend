const accessService = require('../services/access.service')
const catchAsync = require('../utils/catch.async')
const {CREATED, OK} = require("../core/success.response");

class AccessController {

    login = catchAsync(async (req, res, next) => {
        OK(res, "Login success", await accessService.singIn(req.body))
    })

    signUp = catchAsync(async (req, res, next) => {
        CREATED(res, "Register success", await accessService.signUp(req.body))
    })
}

module.exports = new AccessController()