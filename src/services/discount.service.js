const {BusinessLogicError} = require("../core/error.response");
const {convert2ObjectId} = require("../utils");
const {i18n}= require('../configs/config.i18n')
const discountModel = require('../models/discount.model')
const {findAllProducts} = require("../models/repositories/product.repo");
const {findAllDiscountCodesUnSelect} = require("../models/repositories/discount.repo");

class DiscountService {

    static async createDiscountCode(payload) {
        const {
            code, start_date, end_date, is_active, shopId, min_order_value,
            product_ids, applies_to, name, description, type, users_used,
            value, max_value, max_users, users_count, max_uses_per_user
        } = payload

        // validate
        if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
            throw new BusinessLogicError('Discount code has expired')
        }

        if (new Date(end_date) < new Date(start_date)) {
            throw new BusinessLogicError('End date more than start date')
        }

        // create index for discount code
        const foundDiscount = discountModel.findOne({
            discount_code: code,
            discount_shop_id: convert2ObjectId(shopId)
        }).lean()

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BusinessLogicError('Discount exists')
        }

        return await discountModel.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_code: code,
            discount_value: value,
            discount_min_order_value: min_order_value || 0,
            discount_max_value: max_value,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_users,
            discount_uses_count: users_count,
            discount_users_used: users_used,
            discount_shop_id: shopId,
            discount_max_uses_per_user: max_uses_per_user,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all'? [] : product_ids
        })
    }

    static async updateDiscountCode(payload) {
        const {
            code, start_date, end_date, is_active, shopId, min_order_value,
            product_ids, applies_to, name, description, type,
            value, max_value, max_users
        } = payload


    }

    static async getAllDiscountCodeWithProduct({
        code, shopId, userId, limit, page
                                               }) {
        // create index for discount_code
        const foundDiscount = await discountModel.findOne({
            discount_code: code,
            discount_shop_id: convert2ObjectId(shopId)
        })

        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new BusinessLogicError('Discount not exists')
        }

        const {discount_applies_to, discount_product_ids} = foundDiscount
        let filter
        if (discount_applies_to === 'all') {
            // get all
            filter = {
                product_shop: convert2ObjectId(shopId),
                isPublished: true
            }
        }

        if (discount_applies_to === 'specific') {
            // get by product ids
            filter = {
                _id: {$in: discount_product_ids},
                isPublished: true
            }
        }

        return await findAllProducts({
            filter,
            limit: +limit,
            page: +page,
            sort: 'ctime',
            select: ['product_name']
        })
    }

    static async getAllDiscountCodesByShop({
        limit, page, shopId
                                           }) {
        return await findAllDiscountCodesUnSelect(
            {
                limit: +limit,
                page: +page,
                filter: {
                    discount_shopId: convert2ObjectId(shopId),
                    discount_is_active: true
                },
                unSelect: ['__v', 'discount_shop_id'],
                model: discountModel
            }
        )
    }


}

module.exports = {
    DiscountService,
}