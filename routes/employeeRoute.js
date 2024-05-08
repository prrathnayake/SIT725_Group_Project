let express = require("express");
const path = require("path");
let router = express.Router();
let {
  getEmployeeById,
  updateEmployee,
} = require("../controller/employeeController.js");
const { authenticate } = require("../middleware/auth.js");

router.get("/", authenticate, getEmployeeById);

router.get("/employee-profile", authenticate, function (req, res) {
    res.sendFile(path.join(__dirname, `../views/employeeProfile.html`));
});

router.post("/", authenticate, function (req, res) {});

router.put("/", authenticate, updateEmployee);

module.exports = router;
