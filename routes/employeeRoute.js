let express = require("express");
const path = require("path");
let router = express.Router();
let {
  getEmployeeById,
  updateEmployee,
  getEmployees,
  addEmployee,
} = require("../controller/employeeController.js");
const { authenticate } = require("../middleware/auth.js");

router.get("/", authenticate, getEmployees);

router.get("/id", authenticate, getEmployeeById);

router.get("/employee-profile", function (req, res) {
    res.sendFile(path.join(__dirname, `../views/employeeProfile.html`));
});

router.post("/", authenticate, function (req, res) {});
router.put("/add", authenticate, addEmployee);

router.put("/update", authenticate, updateEmployee);

module.exports = router;

