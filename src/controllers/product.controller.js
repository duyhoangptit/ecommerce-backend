// const {ProductFactory} = require('../factories/product.factory')
const {ProductFactoryV2} = require('../factories/productV2.factory')
const catchAsync = require('../helpers/catch.async')
const {CREATED} = require("../core/success.response");

class ProductController {

    createProduct = catchAsync(async (req, res, next) => {
        // CREATED(res, "Create new product success",
        //     await ProductFactory.createProduct(req.body.product_type, {
        //         ...req.body,
        //         product_shop: req.user.userId
        //     }))

        CREATED(res, "Create new product success",
            await ProductFactoryV2.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            }))
    })

}

module.exports = new ProductController()