const payrollService = require('../service/payrollService');

//Add a new payroll
async function addPayroll(req, res) {
    try {
      const payrollData = req.body;

      //Call the addPayroll function in payroll service
      const newPayroll = await payrollService.addPayroll(payrollData);
      res.status(200).json({ success: true, data: newPayroll, message: 'New payroll added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error in adding payroll' + error.message });
    }
};


//Update payroll
async function updatePayroll(req, res) {
    try {
      //retrieve the exisitng record by id
      const { id } = req.params;
      const payrollData = req.body;

      //Call the updatePayroll function in payroll service
      const updatedPayroll = await payrollService.updatePayroll(id, payrollData);
      res.status(200).json({ success: true, data: updatedPayroll, message: 'Payroll updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error in updating payroll' + error.message });
    }
};


//Delete payroll
async function deletePayroll(req, res) {
    try {
      //retrieve the exisitng record by id
      const { id } = req.params;
      //Call the deletePayroll function in payroll service
      await payrollService.deletePayroll(id);

      res.status(200).json({ success: true, data: {},message: 'Payroll deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error in deleting payroll' + error.message });
    }
};

module.exports = { 
    addPayroll,
    updatePayroll,
    deletePayroll,
};

