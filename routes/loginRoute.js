let express = require("express");
let router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../views/login.html"));
});

module.exports = router;
