const {model, Schema} = require("mongoose");

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';

const apiKeySchema = new Schema({
    cart_state: {
        type: String,
        require: true,
        enum: ['active', 'completed', 'fail', 'pending', 'lock'],
        default: 'active'
    },
    cart_products: {
        type: Array,
        require: true,
        default: []
    },
    /**
     * {
     *     productId,
     *     shopId,
     *     quantity,
     *     name,
     *     price
     * }
     */
    cart_count_product: {
        type: Number,
        default: 0
    },
    cart_user_id: {
        type: Number,
        require: true
    }

}, {
    collection: COLLECTION_NAME,
    timeseries: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    },
});

module.exports = model(DOCUMENT_NAME, apiKeySchema)