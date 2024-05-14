const { employeeCollection } = require("../../database/dbConnection.js");
const Employee = require('../../model/employeeModel.js');
const {emitMessageToAdminRoom} = require("../../middleware/websocket-server/emmiter.js")

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
        const message = {
            type: 'employee_updated',
            message: 'Employee ID: ' + updatedEmployee.empId + ' details has been updated'
        };
        // Send the message to all connected clients
        emitMessageToAdminRoom(message);
        // Return the ID of the updated employee
        return result.modifiedCount;
    } catch (error) {
        console.error("Failed to update employee:", error);
        throw error;
    }
}

async function addEmployee(newEmployee) {
    try {
        // Check if the employee already exists
        const existingEmployee = await employeeCollection.findOne({ empId: newEmployee.empId });

        // If the employee already exists, throw an error
        if (existingEmployee) {
            throw new Error("Employee with the same ID already exists");
        }

        // Insert the new employee into the collection
        const result = await employeeCollection.insertOne(newEmployee);

        // Return the ID of the newly added employee
        return result.insertedId;
    } catch (error) {
        console.error("Failed to add employee:", error);
        throw error;
    }
}

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

async function getAllEmployees() {
    try {
        const employees = await employeeCollection.find({});
        if (employees.length > 0) {
            return employees;
        } else {
            throw Error("No employees found.");
        }
    } catch (error) {
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

module.exports = { getAllEmployees, addEmployee, updateEmployee, getEmployeeById };