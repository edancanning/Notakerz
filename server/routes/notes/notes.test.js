const request = require("supertest");
const chai = require("chai");
const chaiSubset = require("chai-subset");

chai.use(chaiSubset);

const expect = chai.expect;
const ObjectId = require("mongoose").mongo.ObjectId;
const app = require("../../server");
const Note = require("../../database/models/note");

var courseId = ObjectId().toHexString();

var notes = [
    {
        course: {
            name: "MAC 2312 Fall 17",
            id: courseId
        },
        notaker: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title1",
        createdAt: new Date().getTime() - 200,
        files: [
            {
                fileType: "pdf",
                url:
                    "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
                thumbnailUrl:
                    "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
                name: "Monday review"
            }
        ]
    },
    {
        course: {
            name: "MAC 2312 Fall 17",
            id: courseId
        },
        notaker: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title2",
        createdAt: new Date().getTime() - 2000,
        files: [
            {
                fileType: "pdf",
                url:
                    "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
                thumbnailUrl:
                    "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
                name: "Monday review"
            }
        ]
    },
    {
        course: {
            name: "MAC 2312 Fall 17",
            id: courseId
        },
        notaker: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title2",
        createdAt: new Date().getTime() + 3000,
        files: [
            {
                fileType: "pdf",
                url:
                    "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
                thumbnailUrl:
                    "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
                name: "Monday review"
            }
        ]
    },
    {
        course: {
            name: "MAC 2312 Fall 17",
            id: courseId
        },
        notaker: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title2",
        createdAt: new Date().getTime(),
        files: [
            {
                fileType: "pdf",
                url:
                    "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
                thumbnailUrl:
                    "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
                name: "Monday review"
            }
        ]
    }
];

// doing this here because of timing issues

beforeEach(done => {
    Note.remove({})
        .then(() => {
            return Note.insertMany(notes);
        })
        .then(() => {
            done();
        })
        .catch(e => {
            done(e);
        });
});

describe("/notes", () => {
    describe("POST /notes", () => {
        it("Should save to DB and return 200", done => {
            var newNote = {
                course: {
                    name: "MAC 2312 Fall 17",
                    id: courseId
                },
                notaker: "edancanning",
                description: "this is a test note right here",
                price: 5.99,
                title: "This is a test title!!!!",
                files: [
                    {
                        fileType: "pdf",
                        url:
                            "https://d9db56472fd41226d193-1e5e0d4b7948acaf6080b0dce0b35ed5.ssl.cf1.rackcdn.com/spectools/docs/wd-spectools-word-sample-04.doc",
                        thumbnailUrl:
                            "https://images.template.net/wp-content/uploads/2017/01/17001629/Sample-Word-Document-Template.jpg",
                        name: "Monday review"
                    }
                ]
            };
            var id;
            request(app)
                .post("/notes")
                .send(newNote)
                .expect(200)
                .expect(req => {
                    expect(req.body.note).to.containSubset(newNote);
                    id = req.body.note._id;
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Note.findById(id)
                        .then(node => {
                            expect(node).to.containSubset(newNote);
                            done();
                        })
                        .catch(e => {
                            done(e);
                        });
                });
        });
    });
    describe("GET /notes", () => {
        it("Should return up to 20 notes newest first", done => {
            request(app)
                .get("/notes")
                .expect(200)
                .expect(res => {
                    expect(res.body.notes.length).to.equal(
                        Math.min(20, notes.length)
                    );
                    for (var i = 0; i < res.body.notes.length - 1; i++) {
                        expect(res.body.notes[i].createdAt).to.be.below(
                            res.body.notes[i + 1].createdAt
                        );
                    }
                })
                .end(done);
        });
    });
});
