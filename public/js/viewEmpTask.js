//Fetch tasks
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/tasks/view-task');
        console.log("Data:" , response)
        const data = await response.json();
        console.log("Data:" , data)


        if (data.success) {
            const taskTable = document.getElementById('taskTable');
            taskTable.innerHTML = '';

            data.data.forEach(task => {
                const row = document.createElement('tr'); 
                row.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.assignedTo}</td>
                    <td>${task.assignedDate}</td>
                    <td>${task.status}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="btn btn-danger delete-btn" data-id="${task._id}">Delete</button>
                        <a href="updatePayroll.html?id=${task._id}" class="btn btn-secondary">Update</a>
                    </td>
                `;
                taskTable.appendChild(row);

                const deleteBtn = row.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', async function () {
                    const taskId = this.dataset.id;
                    await deletePayrollRecord(taskId, row);
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