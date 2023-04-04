const {product, clothing, electronic, furniture} = require('../models/product.model')
const {BusinessLogicError} = require("../core/error.response");
const {findAllDraftsForShop, findAllPublishForShop, publishProductByShop, searchProductByUser} = require("../repositories/product.repo")

class ProductFactoryV2 {

    static productRegistry = {}

    static registerProductType( type, classRef) {
        ProductFactoryV2.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductFactoryV2.productRegistry[type]
        if (!productClass) throw new BusinessLogicError(`Invalid product Types ${type}`)

        return new productClass(payload).createProduct()
    }

    // PUT
    static async publishProductByShop({product_shop, product_id}) {
        // find one
        return await publishProductByShop({product_shop, product_id})
    }

    // query
    static async findAllDraftsForShop({product_shop, limit = 50, skip = 0}) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftsForShop({query, limit, skip})
    }

    static async findAllPublishForShop({product_shop, limit = 50, skip = 0}) {
        const query = { product_shop, isPublished: true }
        return await findAllPublishForShop({query, limit, skip})
    }

    static async searchProducts({keySearch}) {
        return await searchProductByUser({keySearch})
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

// register product type
ProductFactoryV2.registerProductType('Electronic', Electronic)
ProductFactoryV2.registerProductType('Clothing', Clothing)
ProductFactoryV2.registerProductType('Furniture', Furniture)
//... add product other here

module.exports = {
    ProductFactoryV2
}