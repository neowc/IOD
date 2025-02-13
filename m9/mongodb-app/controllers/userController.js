const { User } = require("../models");

function getUsers(res) {
    User.find({})
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            console.error(`[getUsers] Error: ${err.message}`);
            res.status(500).json({ message: err.message });
        });
}

function createUser(data, res) {
    console.log(data);

    new User(data)
        .save()
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            console.error(`[getUsers] Error: ${err.message}`);
            res.status(500).json({ message: err.message });
        });
}

module.exports = {
    getUsers,
    createUser,
};