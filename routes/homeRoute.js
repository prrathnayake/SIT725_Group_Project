let express = require("express");
let router = express.Router();
const path = require("path");
const {authenticate} = require("../middleware/auth.js");

router.get("/", authenticate, function (req, res) {
  res.sendFile(path.resolve(__dirname, "../views/home.html"));
});

module.exports = router;
