const router = require("express").Router();

const Course = require("../../database/models/course");

// TODO: secure this shit

router.post("/", (req, res) => {
    var { courseName, semester, year, courseCode } = req.body;
    var newCourse = new Course({ courseName, semester, year, courseCode });

    newCourse
        .save()
        .then(course => {
            res.send({ course });
        })
        .catch(e => {
            res.status(404).send(e);
        });
});

module.exports = router;
