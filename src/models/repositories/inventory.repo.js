const inventoryModel = require('../inventory.model')
const {Types} = require('mongoose')

const insertInventory = async ({
    productId, shopId, stock, location = 'unKnow'
}) => {
    return await inventoryModel.create({
        inventory_product_id: new Types.ObjectId(productId),
        inventory_location: location,
        inventory_shop_id: new Types.ObjectId(shopId),
        inventory_stock: stock,
    })
}

module.exports = {
    insertInventory
}