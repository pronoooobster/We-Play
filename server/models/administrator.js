var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
    name: { type: String, 
        required: true 
    },
    id: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Administrator', AdministratorSchema);