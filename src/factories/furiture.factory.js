const {furniture} = require("../models/product.model");
const {BusinessLogicError} = require("../core/error.response");
const {Product} = require('./product.factory')

class Furniture extends Product {
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

        const newProduct = await super.createProduct()
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }

        return newProduct
    }
}

module.exports = {
    Furniture
}