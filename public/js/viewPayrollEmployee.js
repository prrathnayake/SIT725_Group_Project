document.addEventListener('DOMContentLoaded', async function () {
    try {
        const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

        if (!userId) {
            alert('User not logged in.');
            window.location.href = '/login'; // Redirect to login page if user is not logged in
            return;
        }

        const response = await fetch('/payroll/view-payroll');
        console.log("Data:", response);
        const data = await response.json();
        console.log("Data:", data);

        if (data.success) {
            const payrollTable = document.getElementById('payrollTable');
            payrollTable.innerHTML = '';

            data.data.forEach(payroll => {
                if (payroll.employeeName === userId) { // Filter data based on user ID
                    const netSalary = Number(payroll.basicSalary) + Number(payroll.allowance);
                    console.log("Net Salary:", netSalary);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${payroll.id}</td>
                        <td>${payroll.employeeName}</td>
                        <td>${payroll.month}</td>
                        <td>${payroll.basicSalary}</td>
                        <td>${payroll.allowance}</td>
                        <td>${netSalary}</td>
                    `;
                    payrollTable.appendChild(row);
                }
            });
        } else {
            alert('Failed to fetch payroll data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});
