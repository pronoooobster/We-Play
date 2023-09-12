var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const UserInClanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clan: {
        type: Schema.Types.ObjectId,
        ref: 'Clan',
        required: true
    },
});