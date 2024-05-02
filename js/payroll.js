//Get employee names to dropdown
async function getEmployeeNames() {
    try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return [];
    }
}

//Function for render employee name dropdown
async function renderEmpNameDropdown() {

}

//Add and display allowance type and allowance amount
function addAllowances() {
    var type = document.getElementById("allowanceType").value;
    var amount = document.getElementById("allowanceAmount").value;

    var allowanceTable = document.getElementById("allowancesTable").getElementsByTagName('tbody')[0];
    //Insert new row
    var newRow = allowanceTable.insertRow();

    //Insert allowance type to table
    var allowanceTypeCell = newRow.insertCell(0);
    //Insert allowance amount to table
    var amountCell = newRow.insertCell(1);

    //Set the cell values
    allowanceTypeCell.innerHTML = type;
    amountCell.innerHTML = amount;
}
document.getElementById("addAllowanceBtn").addEventListener("click", addAllowances);


//Function for add payroll button
async function addPayroll() {
    try {
        const formData = new FormData(document.getElementById("payrollForm"));
        const response = await fetch("/api/add-payroll", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        
        if (data.success) {
            alert("Successfull added",data.message);
            document.getElementById("payrollForm").reset();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error occurred.");
    }
};
document.getElementById("addPayrollBtn").addEventListener("click", addPayroll)


//Reset form after click on clear button
function clearPayrollForm() {
    document.getElementById("payrollForm").reset();
};
document.getElementById("clearBtn").addEventListener("click", clearPayrollForm)
