var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

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
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
});

UserSchema.pre('save', function(next) {
    var user = this;
    // if the user password was modified
    if (!user.isModified('password')) return next();
 
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    // compare the candidate password with the password stored in the database
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
 
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);