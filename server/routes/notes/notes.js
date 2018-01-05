const router = require("express").Router();

const Note = require("../../database/models/note.js");

router.get("/", (req, res) => {
    Note.find({})
        .populate(["course", "notaker"])
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
    var { notaker, description, price, files, title, course } = req.body;

    if (files === undefined || files.length === 0) {
        return res
            .status(400)
            .send("Files attribute on this note is empty or undefined");
    }

    var newNote = new Note({
        notaker,
        description,
        price,
        files,
        title,
        course,
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
