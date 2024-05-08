const EmployeeService = require("../model/service/employeeservice");
const Employee = require("../model/employeeModel");


const updateEmployee = async (req, res) => {
    const { empId, firstName, lastName, dateOfBirth, address, phone, designation, status, department } = req.body;

    try {
        const upsertedId = await EmployeeService.updateEmployee(
            new Employee(empId, firstName, lastName, dateOfBirth, address, phone, designation, department, status)
        );

        if (upsertedId) {
            return res.status(200).json({ statusCode: 200, message: "Employee details updated successfully" });
        } else {
            return res.status(500).json({ statusCode: 500, message: "Failed to update employee" });
        }
    } catch (error) {
        console.log(error);
    }
};

const addEmployee = async (req, res) => {
    const { empId, firstName, lastName, dateOfBirth, address, phone, designation, status, department } = req.body;

    try {
        const insertedId = await EmployeeService.addEmployee(
            new Employee(empId, firstName, lastName, dateOfBirth, address, phone, designation, department, status)
        );

        if (insertedId) {
            return res.status(200).json({ statusCode: 200, message: "Employee details updated successfully" });
        } else {
            return res.status(500).json({ statusCode: 500, message: "Failed to update employee" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getEmployees = async (req, res) => {
    const { empId } = req.query;

    try {
        const employee = await EmployeeService.getAllEmployees();
        return res.json({ statusCode: 200, data: employee, message: "Success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
};

const getEmployeeById = async (req, res) => {
    const { empId } = req.query;

    try {
        const employee = await EmployeeService.getEmployeeById(empId);
        return res.json({ statusCode: 200, data: employee, message: "Success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
};

const addEmployee = async (req, res) => {
    const { empId, firstName, lastName, dateOfBirth, address, phone, designation, status, department } = req.body;

    try {
        const insertedId = await EmployeeService.addEmployee(
            new Employee(empId, firstName, lastName, dateOfBirth, address, phone, designation, department, status)
        );

        if (insertedId) {
            return res.status(200).json({ statusCode: 200, message: "Employee details updated successfully" });
        } else {
            return res.status(500).json({ statusCode: 500, message: "Failed to update employee" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getEmployees = async (req, res) => {
    const { empId } = req.query;

    try {
        const employee = await EmployeeService.getAllEmployees();
        return res.json({ statusCode: 200, data: employee, message: "Success" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
};

module.exports = { getEmployees, addEmployee, getEmployeeById, updateEmployee };