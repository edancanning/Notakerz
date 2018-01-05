const mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    handle: {
        type: String,
        maxlength: 16,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
