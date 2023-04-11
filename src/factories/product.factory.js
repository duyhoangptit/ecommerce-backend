const {product} = require("../models/product.model");

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

    // update product
    async updateProduct(productId, bodyUpdate) {
        return await product.findByIdAndUpdate(productId, bodyUpdate, {
            new: true
        })
    }
}

module.exports = {
    Product
}