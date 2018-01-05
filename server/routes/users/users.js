const router = require("express").Router();

const User = require("../../database/models/user");

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.send({ user });
        })
        .catch(e => {
            res.status(404).send(e);
        });
});

router.post("/", (req, res) => {
    var { handle, email, color, password } = req.body;
    var newUser = new User({ handle, email, color, password });
    newUser
        .save()
        .then(user => {
            res.send({ user });
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

module.exports = router;
