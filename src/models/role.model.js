const {Schema, model} = require('mongoose')

const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'Roles';

const modelSchema = new Schema({
    role_name: {type: String, default: 'user', enum: ['user', 'shop', 'admin']},
    role_slug: {type: String, required: true},
    role_status: {type: String, default: 'pending', enum: ['pending', 'active', 'block']},
    role_description: {type: String, default: ''},
    role_grants: [
        {
            resource: {type: Schema.Types.ObjectId, ref: 'Resource', required: true},
            actions: [{type: String, required: true}],
            attributes: {type: String, default: '*'}
        }
    ]
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, modelSchema);
