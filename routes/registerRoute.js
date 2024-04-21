let express = require("express");
let router = express.Router();
const path = require("path");
const { validateToken } = require("../middleware/auth");

router.get("/", function (req, res) {
  const valideToken = validateToken();
  if (valideToken) {
    res.sendFile(path.resolve(__dirname, "../views/home.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "../views/register.html"));
  }
});

module.exports = router;
