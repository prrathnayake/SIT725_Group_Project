document.addEventListener('DOMContentLoaded', async function () {
    try {
        //Get payroll data for the selected id
        const urlParams = new URLSearchParams(window.location.search);
        const payrollId = urlParams.get('id');
        const response = await fetch(`/payroll/view-byid/${payrollId}`);
        const data = await response.json();

        //Populate input fields with the fetched payroll data
        document.getElementById('id').value = data.id;
        document.getElementById('employeeName').value = data.employeeName;
        document.getElementById('month').value = data.month;
        document.getElementById('basicSalary').value = data.basicSalary;
        document.getElementById('allowance').value = data.allowance;

        const updatePayrollForm = document.getElementById('updatePayrollForm');
        updatePayrollForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedPayrollData = {
                employeeName: document.getElementById('employeeName').value,
                month: document.getElementById('month').value,
                basicSalary: document.getElementById('basicSalary').value,
                allowance: document.getElementById('allowance').value
            };

            try {
                const updateResponse = await fetch(`/payroll/update-payroll/${payrollId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedPayrollData)
                });

                if (updateResponse.ok) {
                    alert('Payroll updated successfully!');
                    window.location.href = '/viewPayroll';
                } else {
                    alert('Failed to update payroll.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An unexpected error occurred in payroll update.');
            }
        });
    } catch (error) {
        console.error('Error fetching payroll data:', error);
        alert('Failed to fetch payroll data.');
    }
});
