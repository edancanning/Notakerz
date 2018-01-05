const mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    notaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 8
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    files: {
        type: [
            {
                _id: false,
                fileType: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                thumbnailUrl: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true,
        validate: [arrayLimit, "{PATH} exceeds the limit of 5"]
    }
});

function arrayLimit(val) {
    return val.length <= 5;
}

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
