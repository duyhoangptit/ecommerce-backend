const cartModel = require('../models/cart.model')

/**
 * - Add product to cart - user
 * - Reduce product quantity by one - user
 * - increase product quantity by one - user
 * - get cart - user
 * - delete cart - user
 * - delete cart item - user
 */
class CartService {

    static async createUserCart({userId, products}) {
        const query = {
            cart_user_id: userId, cart_state: 'active'
        }

        const updateOrInsert = {
            $addToSet: {
                cart_products: products
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
        return await cartModel.findOneAndUpdate(query, updateOrInsert, options)
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
}

module.exports = {
    CartService,
}