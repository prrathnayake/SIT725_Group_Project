const taskModel = require('../empTaskModel.js');

//Get task for select id
async function getTaskById(taskId) {
    try {
        const task = await taskModel.findById(taskId);
        console.log("TaskData:", task)
        return task;
    } catch (error) {
        console.error('Error fetching task details:', error);
        throw new Error('Failed to fetch task details');
    }
}

//Get all task list
async function getAllTasks() {
    try {
        return await taskModel.find();
    } catch (error) {
        console.error('Error fetching task details:', error);
        throw new Error('Error fetching task details');
    }
}

//Add a new payroll
async function addEmpTask(taskData) {
    try {
        const newPayroll = await taskModel.create(taskData);
        console.log('Successfully Added:',newPayroll)
        return newPayroll;
    } catch (error) {
        console.error('Error in adding new payroll:', error);
        throw new Error('Error in adding new payroll');
    }
};


//Update an existing payroll
async function updateEmpTask(id, taskData) {
        try {
        const updatedTask = await taskModel.findByIdAndUpdate(id, taskData, { new: true });

        if (!updatedTask) {
            throw new Error("Payroll not found!");
        }
        return updatedTask;
    } catch (error) {
        throw new Error("Error in updating payroll");}
};


//Delete an existing payroll
async function deleteEmpTask(id) {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            throw new Error("Payroll not found!");
        }
    } catch (error) {
        throw new Error("Error in deleting payroll");
    }
};

//Update an task status
async function updateEmployeeStatus(id, status) {
    try {
    console.log('status:', status)
    const updatedStatus = await taskModel.findByIdAndUpdate(id, { status: status }, { new: true , runValidators: true});
    console.log(updatedStatus)
    if (!updatedStatus) {
        throw new Error("Payroll not found!");
    }
    return updatedStatus;
} catch (error) {
    throw new Error("Error in updating payroll");}
};

const getTasksByUserId = async (userId) => {
    try {
      const tasks = await taskModel.find({ employeeName: userId });
      return tasks;
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
  };

module.exports = { 
    getTaskById,
    getAllTasks,
    addEmpTask,
    updateEmpTask,
    deleteEmpTask,
    updateEmployeeStatus,
    getTasksByUserId
};