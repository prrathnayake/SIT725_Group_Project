let express = require("express");
let router = express.Router();
const path = require("path");
const { validateToken } = require("../middleware/auth");

router.get("/", async function (req, res) {
  const valideToken = await validateToken();
  if (valideToken) {
    res.sendFile(path.resolve(__dirname, "../views/home.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "../views/login.html"));
  }
});

module.exports = router;
