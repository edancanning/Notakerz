const request = require("supertest");
const expect = require("chai").expect;

const app = require("../../server");
const Note = require("../../database/models/note");

var notes = [
    {
        author: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title1",
        createdAt: new Date().getTime() - 200
    },
    {
        author: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title2",
        createdAt: new Date().getTime() - 2000
    },
    {
        author: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title2",
        createdAt: new Date().getTime() + 3000
    },
    {
        author: "edancanning",
        description: "this is a test note right here",
        price: 5.99,
        title: "This is a test title2",
        createdAt: new Date().getTime()
    }
];

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
                author: "edancanning",
                description: "this is a test note right here",
                price: 5.99,
                title: "This is a test title3"
            };
            var id;
            request(app)
                .post("/notes")
                .send(newNote)
                .expect(200)
                .expect(req => {
                    expect(req.body.note).to.include(newNote);
                    id = req.body.note._id;
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Note.findById(id)
                        .then(node => {
                            expect(node).to.include(newNote);
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
