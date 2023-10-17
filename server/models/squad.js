var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SquadSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        min: [2, 'Squad size must be at least 2'],
        required: true
    },
    currentPlayers: {
        type: [{ type: Schema.Types.String, ref: 'User'}],
        required: false
    },
    description: {
        type: String,
        required: false
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: false
    },

});

// middleware to delete the squad if its empty
SquadSchema.pre('update', async function (next) {
    if (this.currentPlayers.length === 0) {
        await this.remove();
    }
    next();
});

module.exports = mongoose.model('Squad', SquadSchema);