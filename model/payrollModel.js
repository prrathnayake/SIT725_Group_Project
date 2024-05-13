const mongoose = require('mongoose');

const payrollDetails = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowance: {
        type: Number,
        required: true
    }
});

const Payroll = mongoose.model('Payroll', payrollDetails);

module.exports = Payroll;
