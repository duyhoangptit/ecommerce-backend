const {model, Schema} = require("mongoose");

// hang ton kho
const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';

const apiKeySchema = new Schema({
    inventory_product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    inventory_location: {
        type: String,
        default: 'unKnow'
    },
    inventory_stock: {
        type: Number,
        required: true
    },
    inventory_shop_id: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    inventory_reservations: {
        type: Array,
        default: []
    },
    /*
        cardId: ,
        stock: 1,
        createdOn: ,
     */
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, apiKeySchema)