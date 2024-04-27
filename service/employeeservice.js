const { employeeCollection } = require("../database/dbConnection.js");
const Employee = require('../model/employeeModel.js');

// update the employee data
async function updateEmployee(employee) {
    try {
        // Retrieve the existing employee  by ID
        const existingEmployee = await employeeCollection.findOne({ empId: employee.empId });

        // Upon the employee is not found
        if (!existingEmployee) {
            throw new Error("Employee not found");
        }

        // Update the existing employee object with the new values
        const updatedEmployee = { ...existingEmployee, ...employee };

        // Update the employee 
        const result = await employeeCollection.updateOne({ empId: employee.empId }, { $set: updatedEmployee });

        // Return the ID of the updated employee
        return result.modifiedCount;
    } catch (error) {
        console.error("Failed to update employee:", error);
        throw error;
    }
}

// retreive the employee by Id
async function getEmployeeById(empId) {
    try {
        const employee = await employeeCollection.findOne({ empId: empId });
        if (employee) {
            return employee;
        } else {
            throw Error("No employee with the Id: " + empId);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { updateEmployee, getEmployeeById };