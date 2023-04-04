const { product, electronic, clothing, furniture } = require("../models/product.model")
const {Types} = require("mongoose")

const publishProductByShop = async ({product_shop, product_id}) => {
    // find one
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id),
    })

    if (!foundShop) return foundShop

    // update isDraft, isPublish
    foundShop.isDraft = false
    foundShop.isPublished = true

    const {modifiedCount} = await foundShop.update(foundShop)

    return modifiedCount;
}

const findAllDraftsForShop = async({query, limit, skip}) => {
    return await queryProduct({query, limit, skip})
}

const findAllPublishForShop = async({query, limit, skip}) => {
    return await queryProduct({query, limit, skip})
}

// search full text
const searchProductByUser = async({keySearch}) => {
    const regexSearch = new RegExp(keySearch)
    const results = await product.find({
        isPublished: true,
        $text: {$search: regexSearch}
    }, {score: {$meta: 'textScore'}})
        .sort({score: {$meta: 'textScore'}})
        .lean()

    return results
}

const queryProduct = async({query, limit, skip}) => {
    return await product.find(query)
        .populate('product_shop', 'name email -_id')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

module.exports = {
    findAllDraftsForShop,
    findAllPublishForShop,
    publishProductByShop,
    searchProductByUser
}