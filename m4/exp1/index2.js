// ................move to app.test
const app = require("./app");

const port = 5000;

app.listen(port, () => {
    console.log(`Server can now be called at ${port}`);
});