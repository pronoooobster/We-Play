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
    gamesList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
        required: false
    },
    
});

module.exports = mongoose.model('Clan', ClanSchema);