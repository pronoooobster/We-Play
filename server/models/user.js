var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friendslist: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: false
    },    
});

module.exports = mongoose.model('User', UserSchema);