const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 0,
        max: 99
    }
});

var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
