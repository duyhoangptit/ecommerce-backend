const {ProductService} = require('../factories/produc.service')
const catchAsync = require('../helpers/catch.async')
const {CREATED, OK} = require("../core/success.response");

class ProductController {

    // create product
    createProduct = catchAsync(async (req, res, next) => {
        CREATED(res, "Create new product success",
            await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            }))
    })

    // PUT
    publishProductByShop = catchAsync(async (req, res, next) => {
        OK(res, "Update publish product success",
            await ProductService.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            }))
    })

    /**
     * @desc Get all Drafts for shop
     * @param {Number} limit
     * @param {Number} skip
     * @return { JSON }
     */
    getAllDraftsForShop = catchAsync(async (req, res, next) => {
        OK(res, "Find list drafts success",
            await ProductService.findAllDraftsForShop({
               product_shop: req.user.userId
            }))
    })

    /**
     * @desc Get all Published for shop
     * @param {Number} limit
     * @param {Number} skip
     * @return { JSON }
     */
    getAllPublishedForShop = catchAsync(async (req, res, next) => {
        OK(res, "Find list published success",
            await ProductService.findAllPublishForShop({
                product_shop: req.user.userId
            }))
    })

    /**
     * @desc search product by key
     * @param {Number} limit
     * @param {Number} skip
     * @return { JSON }
     */
    searchProducts = catchAsync(async (req, res, next) => {
        OK(res, "Search product success",
            await ProductService.searchProducts(req.params))
    })

}

module.exports = new ProductController()