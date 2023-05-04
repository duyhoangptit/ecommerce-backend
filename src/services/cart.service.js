const cartModel = require('../models/cart.model')
const {getProductById} = require("../models/repositories/product.repo");
const {Api404Error} = require("../core/error.response");

/**
 * - Add product to cart - user
 * - Reduce product quantity by one - user
 * - increase product quantity by one - user
 * - get cart - user
 * - delete cart - user
 * - delete cart item - user
 */
class CartService {

    static async createUserCart({userId, product}) {
        const query = {
            cart_user_id: userId, cart_state: 'active'
        }

        const updateOrInsert = {
            $addToSet: {
                cart_products: product
            }
        }, options = {upsert: true, new: true}

        return await cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }

    static async updateUserCartQuantity({userId, product}) {
        const {productId, quantity} = product
        const query = {
            cart_user_id: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = {upsert: true, new: true}
        return await cartModel.findOneAndUpdate(query, updateSet, options)
    }

    static async addToCart({
        userId, product = {}
                           }){
        const userCart = await cartModel.findOne({
            cart_user_id: userId
        })

        if (!userCart) {
            // create cart for User
            return await CartService.createUserCart({userId, product})
        }

        // neu co gio hang roi nhung chua co san pham nao
        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            return await userCart.save()
        }

        // gio hang ton tai, va co san pham nay thi update quantity
        return await CartService.updateUserCartQuantity({userId, product})
    }

    // update cart
    /**
     * shop_order_ids: [
     *  {
     *      shopId,
     *      item_products: [
     *          {
     *              quantity,
     *              price,
     *              shopId,
     *              old_quantity,
     *              productId
     *          }
     *      ],
     *      version
     *  }
     * ]
     */
    static async addToCartV2({userId, shop_order_ids = []}) {
        const {productId, quantity, old_quantity} = shop_order_ids[0]?.item_products[0]

        // check product
        const foundProduct = await getProductById(productId)
        if (!foundProduct) throw new Api404Error('Product not found')

        // compare
        if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
            throw new Api404Error('Product do not belong to the shop')
        }

        if (quantity === 0) {
            // todo deleted
        }

        return await CartService.updateUserCartQuantity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity
            }
        })
    }

    static async deleteItemInCart({userId, productId}) {
        const query = {cart_user_id: userId, cart_state: 'active'}
        const updateSet = {
            $pull: {
                cart_products: {
                    productId
                }
            }
        }

        return await cartModel.updateOne(query, updateSet)
    }

    static async getListUserCart({userId}) {
        return await cartModel.findOne({
            cart_user_id: +userId
        }).lean()
    }
}

module.exports = {
    CartService,
}