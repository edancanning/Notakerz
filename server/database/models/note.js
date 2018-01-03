const mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
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
    files: [
        {
            filetype: {
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
            }
        }
    ]
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
