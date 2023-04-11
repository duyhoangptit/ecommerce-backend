const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");

class HeathController {
    healthcheck = catchAsync((req, res) => {
        // todo: check redis, rabbit, mongodb
        OK(res,  "OK", null);
    })
}

module.exports = new HeathController()