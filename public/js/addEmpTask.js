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