let express = require("express");
let router = express.Router();
let loginController = require("../controller/employeeController.js");
const { authenticate } = require("../middleware/auth.js");

router.get("/", authenticate, async function (req, res) {
    res.json({ message: `Welcome ${req.user.username}` });
});

router.post("/", function (req, res) {
});

module.exports = router;