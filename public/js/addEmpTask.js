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
            option.value = employee.userId;
            dropdown.appendChild(option);
        });

        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return [];
    }
}
getEmployeeNames();



var today = new Date();
var formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
document.getElementById('assignedDate').value = formattedDate;


//function for add payroll button
document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('addTaskBtn');
    
    addTaskBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        

        const taskForm = document.getElementById('taskForm');
        const formData = new FormData(taskForm);
        console.log('Form Data:', formData); 

        const formDataJson = {};
        for (const [key, value] of formData.entries()) {
            formDataJson[key] = value;
        }
        console.log('Form Data JSON:', formDataJson);

        try {
            const response = await fetch('/tasks/add-empTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson) 
            });
            
            
            if (response.ok) {
                alert('Task added successfully!');
                taskForm.reset();
                window.location.href = '/viewEmpTask';
            } else {
                alert('Failed to add payroll.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    });
});



//Reset form after click on clear button
function clearTaskForm() {
    document.getElementById("taskForm").reset();
};
document.getElementById("clearBtn").addEventListener("click", clearTaskForm)

