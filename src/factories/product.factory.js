const {product, clothing, electronic} = require('../models/product.model')
const {BusinessLogicError} = require("../core/error.response");

class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case 'Electronic':
                return new Electronic(payload)
            case 'Clothing':
                return new Clothing(payload)
            default:
                throw new BusinessLogicError(`Invalid product types ${type}`)
        }
    }
}

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_type, product_shop, product_attributes, product_quality
               }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
        this.product_quality = product_quality
    }

    // create new Product
    async createProduct() {
        return await product.create(this)
    }
}

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

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronic.create(
            {
                ...this.product_attributes,
                product_shop: this.product_shop
            }
        )
        if (newElectronic) {
            const newProduct = await super.createProduct()
            if (!newProduct) {
                throw new BusinessLogicError('Create new product error')
            }
            return newProduct
        } else {
            throw new BusinessLogicError('Create new electronic error')
        }
    }
}

module.exports = {
    ProductFactory
}