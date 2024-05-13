const taskModel = require('../model/empTaskModel.js');

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

module.exports = { 
    getTaskById,
    getAllTasks
};