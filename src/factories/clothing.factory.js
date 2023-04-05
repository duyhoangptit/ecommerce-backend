const {clothing} = require("../models/product.model");
const {BusinessLogicError} = require("../core/error.response");
const {Product} = require('./product.factory')

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes)
        if (!newClothing) {
            throw new BusinessLogicError('Create new clothing error')
        }

        const newProduct = await super.createProduct()
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }
        return newProduct
    }
}

module.exports = {
    Clothing
}