class Employee {
    constructor(empId, firstName, lastName, dateOfBirth, address, phone, designation, department, status ) {
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phone = phone;
        this.designation = designation;
        this.department = department;
        this.status = status;
    }
}

module.exports = Employee;