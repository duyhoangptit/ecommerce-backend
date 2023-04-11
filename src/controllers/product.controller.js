const {ProductService} = require('../services/product.service')
const catchAsync = require('../helpers/catch.async')
const {CREATED, OK} = require("../core/success.response");

class ProductController {

    // create product
    createProduct = catchAsync(async (req, res) => {
        CREATED(res, "Create new product success",
            await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            }))
    })

    // PUT
    publishProductByShop = catchAsync(async (req, res) => {
        OK(res, "Update publish product success",
            await ProductService.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            }))
    })

    updateProduct = catchAsync(async (req, res) => {
        OK(res, "Update product success",
            await ProductService.updateProduct(req.body.product_type, req.params.productId, {
                ...req.body,
                product_shop: req.user.userId
            }))
    })

    /**
     * @desc Get all Drafts for shop
     * @param {Number} limit
     * @param {Number} skip
     * @return { JSON }
     */
    getAllDraftsForShop = catchAsync(async (req, res) => {
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
    getAllPublishedForShop = catchAsync(async (req, res) => {
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
    searchProducts = catchAsync(async (req, res) => {
        OK(res, "Search product success",
            await ProductService.searchProducts(req.params))
    })

    findAllProducts = catchAsync(async (req, res) => {
        OK(res, "find all product success",
            await ProductService.findAllProducts(req.params))
    })

    findProduct = catchAsync(async (req, res) => {
        OK(res, "find product success",
            await ProductService.findOneProduct(req.params.product_id))
    })

}

module.exports = new ProductController()