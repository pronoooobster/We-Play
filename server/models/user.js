var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    friendslist: {
        type: [{ type: Schema.Types.String, ref: 'User' }],
        required: false
    },
    clansList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Clan' }],
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    currentSquad: {
        type: Schema.Types.ObjectId,
        ref: 'Squad',
        required: false
    },
    photoURL: {
        type: String,
        required: false
    },
});

// middleware that will handle deleting all the mentions of a user in other documents
UserSchema.pre('remove', async function (next) {
    // if the user has a squad
    if (this.currentSquad) {
        // remove user from the squad
        await this.model('Squad').updateOne(
            { _id: this.currentSquad },
            { $pull: { currentPlayers: this._id } }
        );
    }

    // remove user from all the other users friendslist
    await this.model('User').updateMany(
        { friendslist: this._id },
        { $pull: { friendslist: this._id } }
    );

    // remove user from all the clans
    await this.model('Clan').updateMany(
        { users: this._id },
        { $pull: { users: this._id } }
    );
});

module.exports = mongoose.model('User', UserSchema);