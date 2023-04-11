const {Schema, model} = require('mongoose')

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema({
    usr_id: {type: String, required: true},
    usr_slug: {type: String, required: true},
    usr_name: {type: String, required: true},
    usr_email: {type: String, required: true},
    usr_password: {type: String, required: true},
    usr_salt: {type: String, required: true},
    usr_sex: {type: String, default: null},
    usr_phone: {type: String, default: null},
    usr_avatar: {type: String, default: null},
    usr_dob: {type: Date, default: null},
    usr_role: {type: Schema.Types.ObjectId, ref: 'Role'},
    usr_status: {type: String, default: 'pending', enum: ['pending', 'active', 'block']},
}, {
  collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, userSchema);
