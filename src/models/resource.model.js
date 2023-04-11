const {Schema, model} = require('mongoose')

const DOCUMENT_NAME = 'Resource';
const COLLECTION_NAME = 'Resources';

const modelSchema = new Schema({
    src_name: {type: String, required: true},
    src_slug: {type: String, required: true},
    src_description: {type: String, default: ''},
    usr_status: {type: String, default: 'pending', enum: ['pending', 'active', 'block']},
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, modelSchema);
