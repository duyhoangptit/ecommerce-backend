const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");
const {DiscountService} = require("../services/discount.service");

class DiscountController {
    createDiscountCode = catchAsync((req, res) => {
        OK(res,  "Create discount success",
            DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            }));
    })

    updateDiscountCode = catchAsync((req, res) => {
        OK(res,  "Update discount success",
            DiscountService.updateDiscountCode({
                ...req.body,
                shopId: req.user.userId
            }));
    })

    getAllDiscountCodeWithProduct = catchAsync((req, res) => {
        OK(res,  "Get Discount Code success",
            DiscountService.getAllDiscountCodeWithProduct({
                ...req.body,
                shopId: req.user.userId,
            }));
    })

    getAllDiscountCodesByShop = catchAsync((req, res) => {
        OK(res,  "Get all discount codes success",
            DiscountService.getAllDiscountCodesByShop({
                ...req.query,
                shopId: req.user.userId
            }));
    })

    getDiscountAmount = catchAsync((req, res) => {
        OK(res,  "Get discount amount success",
            DiscountService.getDiscountAmount({
                ...req.body,
                shopId: req.user.userId
            }));
    })

    deleteDiscountCode = catchAsync((req, res) => {
        OK(res,  "Delete discount success",
            DiscountService.deleteDiscountCode({
                ...req.body,
                shopId: req.user.userId
            }));
    })

    cancelDiscountCode = catchAsync((req, res) => {
        OK(res,  "Cancel discount success",
            DiscountService.cancelDiscountCode({
                ...req.body,
                shopId: req.user.userId
            }));
    })

}

module.exports = new DiscountController()