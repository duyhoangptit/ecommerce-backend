const {furniture} = require("../../models/product.model");
const {BusinessLogicError} = require("../../core/error.response");
const {ProductFactory} = require('./product.factory')

class FurnitureFactory extends ProductFactory {
    async createProduct() {
        const newFurniture = await furniture.create(
            {
                ...this.product_attributes,
                product_shop: this.product_shop
            }
        )
        if (!newFurniture) {
            throw new BusinessLogicError('Create new Furniture error')
        }

        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }

        return newProduct
    }
}

module.exports = {
    FurnitureFactory
}
