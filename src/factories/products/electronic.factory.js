const {electronic} = require("../../models/product.model");
const {BusinessLogicError} = require("../../core/error.response");
const {ProductFactory} = require('./product.factory')

class ElectronicFactory extends ProductFactory {
    async createProduct() {
        const newElectronic = await electronic.create(
            {
                ...this.product_attributes,
                product_shop: this.product_shop
            }
        )
        if (!newElectronic) {
            throw new BusinessLogicError('Create new electronic error')
        }

        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }
        return newProduct
    }
}

module.exports = {
    ElectronicFactory
}
