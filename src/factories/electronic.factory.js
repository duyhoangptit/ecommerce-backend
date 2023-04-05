const {electronic} = require("../models/product.model");
const {BusinessLogicError} = require("../core/error.response");
const {Product} = require('./product.factory')

class Electronic extends Product {
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

        const newProduct = await super.createProduct()
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }
        return newProduct
    }
}

module.exports = {
    Electronic
}