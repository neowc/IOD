// const express = require("express");
// const app = express();

// require("dotenv").config();
// const dbConnect = require("../dbConnect");
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to my MySQL application." });
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
// matches GET requests sent to /api/users
// (the prefix from server.js)
router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})
// matches POST requests sent to /api/users/create
router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res)
})
module.exports = router;