let express = require("express");
let router = express.Router();
let {
  registerEmployee,
  loginEmployee,
} = require("../controller/authController.js");

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

module.exports = router;
