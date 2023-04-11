const userService = require('../services/user.service')
const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");

class UserController {

    registerUser = catchAsync(async (req, res) => {
        OK(res, "Register user success", await userService.registerUser(req.body))
    })

    checkLoginEmailToken = catchAsync(async (req, res) => {
        OK(res, "check login with email success", await userService.checkLoginEmailToken(req.body))
    })

}

module.exports = new UserController()
