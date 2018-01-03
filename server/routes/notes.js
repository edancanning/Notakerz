const router = require("express").Router();

const Note = require("../database/models/note.js");

router.get("/", (req, res) => {
    Note.find({})
        .sort({ createdAt: 1 })
        .limit(20)
        .then(notes => {
            res.send({ notes });
        })
        .catch(e => {
            res.status(404).send();
        });
});

router.post("/", (req, res) => {
    let { author, description, price, files, title } = req.body;
    var newNote = new Note({
        author,
        description,
        price,
        files,
        title,
        createdAt: new Date().getTime()
    });

    newNote
        .save()
        .then(note => {
            res.send({ note });
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

module.exports = router;
