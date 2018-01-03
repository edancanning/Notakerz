require("./config");
const express = require("express");
const bodyparser = require("body-parser");

const mongoose = require("./database/mongoose");
const notesRouter = require("./routes/notes");

var app = express();

app.use(bodyparser.json());
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
    res.send("Yo!");
});

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);

module.exports = app;
