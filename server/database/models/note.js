const mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    notaker: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    course: {
        type: Object,
        required: true,
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            requird: true
        }
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
