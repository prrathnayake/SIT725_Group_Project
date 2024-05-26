let express = require("express");
let router = express.Router();
const path = require('path');
const { authenticate } = require("../middleware/auth.js");

router.get("/", authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, `../views/login.html`));
});

module.exports = router;
