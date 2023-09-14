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
        validate: {
            validator: function(v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: true,
        unique: true
    },
    date_of_birth: {
        type: Date,
        validate: {
            validator: function(v) {
              return v < Date.now();
            },
            message: props => `${props.value} is not a valid date of birth!`
        },
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
    clansList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Clan' }],
        required: false
    },    
});

module.exports = mongoose.model('User', UserSchema);