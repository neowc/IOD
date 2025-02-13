const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // todo: comback and fix this once controller is created
    res.send("this is route is working");
});

router.post("/create", (req, res) => {
    // todo: comback and fix this once controller is created
});

module.exports = router;