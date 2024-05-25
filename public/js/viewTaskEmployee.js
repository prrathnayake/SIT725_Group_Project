// Fetch tasks
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('User not logged in.');
            window.location.href = '/login'; // Redirect to login page if user is not logged in
            return;
        }
        const response = await fetch('/tasks/view-task');
        console.log("Data:", response);
        const data = await response.json();
        console.log("Data:", data);

        if (data.success) {
            const taskTable = document.getElementById('taskTable');
            taskTable.innerHTML = '';

            data.data.forEach(task => {
                if (task.employeeName === userId) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.employeeName}</td>
                    <td>${task.assignedDate}</td>
                    <td>
                        <select class="form-select status-dropdown" data-id="${task._id}">
                            <option value="New" ${task.status === 'New' ? 'selected' : ''}>New</option>
                            <option value="Ongoing" ${task.status === 'Ongoing' ? 'selected' : ''}>Ongoing</option>
                            <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </td>
                    <td>${task.endDate}</td>
                    <td>
                        <button class="btn btn-secondary save-btn" data-id="${task._id}">Save</button>
                    </td>
                `;
                taskTable.appendChild(row);
                
                const saveBtn = row.querySelector('.save-btn');
                saveBtn.addEventListener('click', async function () {
                    const taskId = this.dataset.id;
                    const statusDropdown = row.querySelector('.status-dropdown');
                    const newStatus = statusDropdown.value;
                    await saveTaskStatus(taskId, newStatus);
                });
            }
            });
        } else {
            alert('Failed to fetch data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});

//Save the task status
async function saveTaskStatus(taskId, newStatus) {
    try {
        const saveResponse = await fetch(`/tasks/update-status/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (saveResponse.ok) {
            alert('Status updated successfully!');
    
        } else {
            alert('Failed to update status.');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('An unexpected error occurred.');
    }
}
