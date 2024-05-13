//Load empoyee names to dropdown


async function getEmployeeNames() {
    try {
        const response = await fetch('/api/employees');
        console.log(response)
        
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
            console.log(employee['empName']);
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

//function for add payroll button
document.addEventListener('DOMContentLoaded', function () {
    const addPayrollBtn = document.getElementById('addPayrollBtn');
    
    addPayrollBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        

        const payrollForm = document.getElementById('payrollForm');
        const formData = new FormData(payrollForm);
        console.log('Form Data:', formData); 

        const formDataJson = {};
        for (const [key, value] of formData.entries()) {
            formDataJson[key] = value;
        }
        console.log('Form Data JSON:', formDataJson);

        try {
            const response = await fetch('/payroll/add-payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson) 
            });
            
            
            if (response.ok) {
                alert('Payroll added successfully!');
                payrollForm.reset();
                window.location.href = '/viewPayroll';
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
function clearPayrollForm() {
    document.getElementById("payrollForm").reset();
};
document.getElementById("clearBtn").addEventListener("click", clearPayrollForm)



