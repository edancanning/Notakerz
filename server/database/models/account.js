const mongoose = require("mongoose");

var AccountSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notaker: {
        type: mongoose.Schema.Types.ObjectId
    },
    purchasedNotes: {
        type: Object
    }
});

var Account = mongoose.model("Account", UserSchema);

module.exports = Account;
