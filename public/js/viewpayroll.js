//Delete payroll
async function deletePayrollRecord(payrollId, row) {
    try {
        const deleteResponse = await fetch(`/payroll/delete-payroll/${payrollId}`, {
            method: 'POST'
        });
        if (deleteResponse.ok) {
            row.remove();
            alert('Payroll record deleted successfully!');
        } else {
            alert('Failed to delete payroll record.');
        }
    } catch (error) {
        console.error('Error deleting payroll:', error);
        alert('An unexpected error occurred.');
    }
}


//Fetch all payroll data to table in view payroll page
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/payroll/view-payroll');
        console.log("Data:" , response)
        const data = await response.json();
        console.log("Data:" , data)


        if (data.success) {
            const payrollTable = document.getElementById('payrollTable');
            payrollTable.innerHTML = '';

            data.data.forEach(payroll => {
                const netSalary = Number(payroll.basicSalary) + Number(payroll.allowance);
                console.log("Net Salary:",netSalary)
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${payroll.id}</td>
                    <td>${payroll.employeeName}</td>
                    <td>${payroll.month}</td>
                    <td>${payroll.basicSalary}</td>
                    <td>${payroll.allowance}</td>
                    <td>${netSalary}</td>
                    <td>
                        <button class="btn btn-danger delete-btn" data-id="${payroll._id}">Delete</button>
                        <a href="/updatePayroll?id=${payroll._id}" class="btn btn-secondary">Edit</a>
                    </td>
                `;
                payrollTable.appendChild(row);

                const deleteBtn = row.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', async function () {
                    const payrollId = this.dataset.id;
                    await deletePayrollRecord(payrollId, row);
                });
            });
        } else {
            alert('Failed to fetch payroll data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});


