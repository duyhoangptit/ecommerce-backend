const accessService = require('../services/access.service')
const catchAsync = require('../helpers/catch.async')
const {CREATED, OK} = require("../core/success.response");

class AccessController {

    login = catchAsync(async (req, res, next) => {
        OK(res, "Login success", await accessService.singIn(req.body))
    })

    refreshToken = catchAsync(async (req, res, next) => {
        OK(res, "Get token success", await accessService.refreshToken(req.body.refreshToken))
    })

    logout = catchAsync(async (req, res, next) => {
        OK(res, "Logout success", await accessService.logout(req.keyStore))
    })

    signUp = catchAsync(async (req, res, next) => {
        CREATED(res, "Register success", await accessService.signUp(req.body))
    })
}

module.exports = new AccessController()