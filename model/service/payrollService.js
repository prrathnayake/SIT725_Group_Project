const payrollModel = require('../payrollModel.js');

//Get pay roll details for select id
async function getPayrollById(payrollId) {
    try {
        const payroll = await payrollModel.findById(payrollId);
        console.log("PayrollData:", payroll)
        return payroll;
    } catch (error) {
        console.error('Error fetching payroll details:', error);
        throw new Error('Failed to fetch payroll details');
    }
}

//Get all pay roll records
async function getAllPayrolls() {
    try {
        return await payrollModel.find();
    } catch (error) {
        console.error('Error fetching payroll details:', error);
        throw new Error('Error fetching payroll details');
    }
}

//Add a new payroll
async function addPayroll(payrollData) {
    try {
        const newPayroll = await payrollModel.create(payrollData);
        console.log('Successfully Added:',newPayroll)
        return newPayroll;
    } catch (error) {
        console.error('Error in adding new payroll:', error);
        throw new Error('Error in adding new payroll');
    }
}


//Update an existing payroll
async function updatePayroll(id, payrollData) {
        try {
        const updatedPayroll = await payrollModel.findByIdAndUpdate(id, payrollData, { new: true });

        if (!updatedPayroll) {
            throw new Error("Payroll not found!");
        }
        return updatedPayroll;
    } catch (error) {
        throw new Error("Error in updating payroll");}
};


//Delete an existing payroll
async function deletePayroll(id) {
    try {
        const deletedPayroll = await payrollModel.findByIdAndDelete(id);
        if (!deletedPayroll) {
            throw new Error("Payroll not found!");
        }
    } catch (error) {
        throw new Error("Error in deleting payroll");
    }
};

module.exports = { 
    getPayrollById,
    getAllPayrolls,
    addPayroll,
    updatePayroll,
    deletePayroll,
};

