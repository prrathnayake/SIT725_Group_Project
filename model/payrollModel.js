const mongoose = require('mongoose');

const allowanceDetails = new mongoose.Schema({
    allowanceType: {
      type: String,
      required: true
    },
    allowanceAmount: {
      type: Number,
      required: true
    }
});

const payrollDetails = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowances: [allowanceDetails],
    totAllowance: {
        type: Number,
        default:0
    }
});

module.exports = mongoose.model('Payroll', payrollDetails);
