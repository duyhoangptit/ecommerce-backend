const {BusinessLogicError} = require("../core/error.response");
const {findAllDraftsForShop, findAllPublishForShop, publishProductByShop, searchProductByUser} = require("../repositories/product.repo")

class ProductService {

    static productRegistry = {}

    static registerProductType( type, classRef) {
        ProductService.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductService.productRegistry[type]
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

module.exports = {
    ProductService,
}