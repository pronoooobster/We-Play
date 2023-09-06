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
        required: true
    },
    description: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Game', GameSchema);