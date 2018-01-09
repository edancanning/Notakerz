const mongoose = required("Mongoose");

var NotakerSchema = new mongoose.Schema({
    handle: {
        stype: String,
        required: true,
        maxlength: 16,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
});

var Notaker = mongoose.model("Notaker", NotakerSchema);

module.exports = Notaker;
