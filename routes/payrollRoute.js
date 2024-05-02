const express = require('express');
const router = express.Router();
const payrollController = require('../controller/payrollController');
const { authenticate } = require("../middleware/auth.js");

router.post('/add-payroll', authenticate,payrollController.addPayroll);

router.post('/update-payroll/:id', authenticate, payrollController.updatePayroll);

router.post('/delete-payroll/:id', authenticate, payrollController.deletePayroll);

module.exports = router;
