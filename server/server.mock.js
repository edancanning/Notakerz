const express = require("express");
const bodyparser = require("body-parser");

var app = express();

var notaker = {
  _id: "5a4fab9dd41bff1e5c161e85",
  handle: "edancanning",
  __v: 0
};

var course = {
  _id: "5a4d9ee4fbdf334a5ce790fe",
  courseName: "Calculus 2",
  semester: "Fall",
  year: 17,
  courseCode: "MAC 2312",
  __v: 0
};

var note = {
  _id: "5a4d9ee4fbdf334a5ce790fe",
  files: [
    {
      fileType: "pdf",
      url:
        "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
      thumbnailUrl:
        "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
      name: "Monday review"
    }
  ],
  notaker: notaker,
  description: "this is a note from postman",
  price: 5.99,
  title: "This is a postman title!",
  course: "MAC 2312 FALL 17 (Chui)",
  createdAt: 1515171923445.0,
  __v: 0
};

files = [
  {
    fileType: "pdf",
    url:
      "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
    thumbnailUrl:
      "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
    name: "Monday review"
  },
  {
    fileType: "pdf",
    url:
      "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
    thumbnailUrl:
      "https://www.natcom.org/sites/default/files/cm-current/Photo%20-%20college%20student%20in%20a%20classroom.jpg",
    name: "Monday review"
  },
  {
    fileType: "pdf",
    url:
      "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
    thumbnailUrl:
      "http://domainlives.com/wp-content/uploads/2016/11/best-photos-of-report-writing-sample-report-writing-sample-pdf-with-87-enchanting-examples-of-writing-samples.png",
    name: "Monday review"
  },
  {
    fileType: "pdf",
    url:
      "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
    thumbnailUrl:
      "https://az616578.vo.msecnd.net/files/2016/05/15/635989398915235129-307976603_everything-you-will-need-for-your-first-day-of-college-1408124050.jpg",
    name: "Monday review"
  }
];

function getNote(i) {
  var newNote = Object.assign({}, note);
  newNote._id = i;
  newNote.files = [files[i % files.length]];
  return newNote;
}

function getCourse(i) {
  var newCourse = Object.assign({}, course);
  newCourse._id = i;
  newCourse.courseName = `Calculus ${i}`;
  return newCourse;
}

var notes = [];

for (let i = 0; i < 10; i++) {
  notes.push(getNote(i));
}

var courses = [];

for (let i = 0; i < 10; i++) {
  courses.push(getCourse(i));
}

app.get("/notes", (req, res) => {
  console.log("GET /notes");
  setTimeout(() => {
    res.send({ notes });
  }, 100);
});

app.get("/courses", (req, res) => {
  console.log("GET /courses");
  setTimeout(() => {
    res.send({ courses });
  }, 100);
});

const PORT = 3001;

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);
