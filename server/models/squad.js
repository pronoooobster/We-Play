var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SquadSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        min: [1, 'Squad size must be at least 1'],
        required: true
    },
    currentPlayers: {
        type: [{ type: Schema.Types.String, ref: 'User'}],
        required: false
    },
    description: {
        type: String,
    },
    game: {
        type: [{ type: Schema.Types.String, ref: 'User'}],
        ref: 'Game',
        required: false
    },

});

module.exports = mongoose.model('Squad', SquadSchema);