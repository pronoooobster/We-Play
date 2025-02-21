var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teamSize: {
        type: Number,
        min: [1, 'Team size must be at least 1'],
        required: false
    },
});

module.exports = mongoose.model('Game', GameSchema);