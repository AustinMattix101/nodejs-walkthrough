var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);