const express = require('express');
const router = express.Router();
const payrollController = require('../controller/payrollController');

console.log("route..");
router.get('/view-byid/:id', payrollController.getPayrollById);

router.get('/view-payroll', payrollController.viewPayroll)

router.post('/add-payroll', payrollController.addPayroll);

router.post('/update-payroll/:id', payrollController.updatePayroll);

router.post('/delete-payroll/:id', payrollController.deletePayroll);

module.exports = router;
