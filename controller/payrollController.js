const payrollService = require('../model/service/payrollService');

//Get payroll data for selected id
async function getPayrollById(req, res) {
  try {
      const payrollId = req.params.id;
      console.log("PayrollId:", payrollId)
      const payroll = await payrollService.getPayrollById(payrollId);
      res.status(200).json(payroll);
  } catch (error) {
      console.error('Error fetching payroll by ID:', error);
      res.status(500).json({ error: 'Failed to fetch payroll by ID' });
  }
}



//Add a new payroll
async function addPayroll(req, res) {
  console.log("1234");
  console.log('body:', req.body);
    try {
      const payrollData = req.body;
      console.log("Payroll data:", payrollData);

      const newPayroll = await payrollService.addPayroll(payrollData);
        res.status(200).json({ success: true, data: newPayroll, message: 'New payroll added successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ success: false, error: 'Error in adding payroll' + error.message });
    }
};


//View selected payroll
async function viewPayroll(req, res) {
  try {
      const allPayrolls = await payrollService.getAllPayrolls();
      console.log('All payrolls:', allPayrolls);

      res.status(200).json({ success: true, data: allPayrolls });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error in retrieving payroll data' });
  }
};


//Update payroll
async function updatePayroll(req, res) {
    try {
      const { id } = req.params;
      const payrollData = req.body;
      console.log('Update payroll:', payrollData);

      const updatedPayroll = await payrollService.updatePayroll(id, payrollData);
      console.log('Updated payroll:', updatedPayroll);
      res.status(200).json({ success: true, data: updatedPayroll, message: 'Payroll updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error in updating payroll' + error.message });
    }
};


//Delete payroll
async function deletePayroll(req, res) {
    try {
      const { id } = req.params;
      await payrollService.deletePayroll(id);

      res.status(200).json({ success: true, data: {},message: 'Payroll deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error in deleting payroll' + error.message });
    }
};

module.exports = { 
    getPayrollById,
    addPayroll,
    viewPayroll,
    updatePayroll,
    deletePayroll
};

