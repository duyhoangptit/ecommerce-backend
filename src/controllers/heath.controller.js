const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");

class HeathController {
    healthcheck = catchAsync((req, res) => {
        OK(res,  "OK", null);
    })
}

module.exports = new HeathController()