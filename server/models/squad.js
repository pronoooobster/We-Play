var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SquadSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    currentPlayers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        required: false
    },
    description: {
        type: String,
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: false
    },

});

module.exports = mongoose.model('Squad', SquadSchema);