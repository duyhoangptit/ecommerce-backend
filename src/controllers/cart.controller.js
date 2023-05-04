const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");
const {DiscountService} = require("../services/discount.service");

/**
 * - Add product to cart - user
 * - Reduce product quantity by one - user
 * - increase product quantity by one - user
 * - get cart - user
 * - delete cart - user
 * - delete cart item - user
 */
class CartController {
    createDiscountCode = catchAsync((req, res) => {
        OK(res,  "Create discount success",
            DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            }));
    })

}

module.exports = new CartController()