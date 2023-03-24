const {ProductFactory} = require('../factories/product.factory')
const catchAsync = require('../helpers/catch.async')
const {CREATED} = require("../core/success.response");

class ProductController {

    createProduct = catchAsync(async (req, res, next) => {
        CREATED(res, "Create new product success",
            await ProductFactory.createProduct(req.body.product_type, req.body))
    })

}

module.exports = new ProductController()