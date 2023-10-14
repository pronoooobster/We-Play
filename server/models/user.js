var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    friendslist: {
        type: [{ type: Schema.Types.String, ref: 'User' }],
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
    currentSquad: {
        type: Schema.Types.ObjectId,
        ref: 'Squad',
        required: false
    },
    photoURL: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('User', UserSchema);