const {productModel, clothingModel, electronicModel, furnitureModel} = require('../models/product.model')
const {BusinessLogicError} = require("../core/error.response");

class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case 'Electronics':
                return new Electronic(payload)
            case 'Electronics':
                return new Clothing(payload)
            default:
                throw new BusinessLogicError(`Invalid product types ${type}`)
        }
    }
}

class Product {
    contructor({
        product_name, product_thumb, product_description, product_price,
        product_type, product_shop, product_attributes, product_quantity
               }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
        this.product_quantity = product_quantity
    }

    // create new Product
    async createProduct() {
        return await productModel.create(this)
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothingModel.create(this.product_attributes)
        if (!newClothing) {
            throw new BusinessLogicError('Create new clothing error')
        }

        const newProduct = await super.createProduct()
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }
    }
}

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronicModel.create(this.product_attributes)
        if (!newElectronic) {
            throw new BusinessLogicError('Create new electronic error')
        }

        const newProduct = await super.createProduct()
        if (!newProduct) {
            throw new BusinessLogicError('Create new product error')
        }
    }
}

module.exports = {
    ProductFactory
}