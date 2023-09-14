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
        required: true
    },
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        required: true
    }
    
});

module.exports = mongoose.model('Clan', ClanSchema);