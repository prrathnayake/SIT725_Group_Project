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
                    <td>${task.employeeName}</td>
                    <td>${task.assignedDate}</td>
                    <td>${task.status}</td>
                    <td>${task.endDate}</td>
                    <td>
                        <button class="btn btn-danger delete-btn" data-id="${task._id}">Delete</button>
                        <a href="/updateEmpTask?id=${task._id}" class="btn btn-secondary">Edit</a>
                    </td>
                `;
                taskTable.appendChild(row);

                const deleteBtn = row.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', async function () {
                    const taskId = this.dataset.id;
                    await deleteTaskRecord(taskId, row);
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

//Delete payroll
async function deleteTaskRecord(taskId, row) {
    try {
        const deleteResponse = await fetch(`/tasks/delete-empTask/${taskId}`, {
            method: 'POST'
        });
        if (deleteResponse.ok) {
            row.remove();
            alert('Task record deleted successfully!');
        } else {
            alert('Failed to delete Task record.');
        }
    } catch (error) {
        console.error('Error deleting Task:', error);
        alert('An unexpected error occurred.');
    }
}
