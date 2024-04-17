let express = require("express");
let router = express.Router();
const {authenticate} = require("../middleware/auth.js");

router.get('/', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.employee.username}` });
  });

module.exports = router;