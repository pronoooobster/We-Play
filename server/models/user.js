var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    UID: {
        type: String,
        required: true,
        unique: true
    },
    friendslist: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: false
    },
    clansList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Clan' }],
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
});

module.exports = mongoose.model('User', UserSchema);