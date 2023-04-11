const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");
const {InventoryService} = require("../services/inventory.service");

class InventoryController {
    addStockToInventory = catchAsync(async (req, res) => {
        OK(res,  "Get cart info success",
            await InventoryService.addStockToInventory(req.body));
    })
}

module.exports = new InventoryController()