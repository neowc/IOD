"use strict";
const { User } = require("../models");

function getUsers(res) {
    User.findAll({})
        .then((users) => {
            res.status(200).json({
                success: true,
                users,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err.message,
            });
        });
}

function createUser(data, res) {
    User.create(data)
        .then((user) => {
            res.status(200).json({
                success: true,
                user,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err.message,
            });
        });
}

module.exports = {
    getUsers,
    createUser,
};