var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SquadSchema = new Schema({
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
        required: true
    },
    description: {
        type: String,
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },

});

module.exports = mongoose.model('Squad', SquadSchema);