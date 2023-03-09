const AccessService = require('../services/access.service')
const SuccessResponse = require("../core/success.response");

class AccessController {
    signUp = async (req, res, next) => {
        console.log(req.body)
        return SuccessResponse.successHandler(res, await AccessService.signUp(req.body), 'SignUp success', 201)
    }
}

module.exports = new AccessController()