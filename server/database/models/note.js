const mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
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
    createdAt: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    notaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notaker",
        required: true
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: true
    }
    files: {
        type: [
            {
                _id: false,
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
