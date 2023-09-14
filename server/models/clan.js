var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const ClanSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: Number,
        min: [1, 'Clan size must be at least 1'],
        required: true
    },
    gamesList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
        required: false
    },
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        required: true
    }
    
});

module.exports = mongoose.model('Clan', ClanSchema);