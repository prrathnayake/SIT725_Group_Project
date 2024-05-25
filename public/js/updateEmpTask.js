//Load empoyee names to dropdown
async function getEmployeeNames() {
    try {
        const response = await fetch('/api/employees');
        console.log(response);
        const data = await response.json();
        console.log(data)
        const dropdown = document.getElementById('employeeName');

        dropdown.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.text = 'Please select employee name';
        defaultOption.value = '';
        dropdown.appendChild(defaultOption);


        data.forEach(employee => {
            const option = document.createElement('option');
            option.text = employee.empName;
            //option.value = employee._id;
            dropdown.appendChild(option);
        });

        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return [];
    }
}
getEmployeeNames();

document.addEventListener('DOMContentLoaded', async function () {
    try {
        //Get payroll data for the selected id
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('id');
        const response = await fetch(`/tasks/view-byid/${taskId}`);
        const data = await response.json();

        //Populate input fields with the fetched payroll data
        document.getElementById('id').value = data.id;
        document.getElementById('title').value = data.title;
        document.getElementById('employeeName').value = data.employeeName;
        document.getElementById('assignedDate').value = data.assignedDate;
        document.getElementById('status').value = data.status;
        document.getElementById('endDate').value = data.endDate;

        const updatePayrollForm = document.getElementById('updateTaskForm');
        updatePayrollForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedPayrollData = {
                title: document.getElementById('title').value,
                employeeName: document.getElementById('employeeName').value,
                assignedDate: document.getElementById('assignedDate').value,
                status: document.getElementById('status').value,
                endDate: document.getElementById('endDate').value
            };

            try {
                const updateResponse = await fetch(`/tasks/update-empTask/${taskId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedPayrollData)
                });

                if (updateResponse.ok) {
                    alert('Payroll updated successfully!');
                    window.location.href = '/viewEmpTask';
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