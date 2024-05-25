const empTaskService = require('../model/service/empTaskService');

//Get payroll data for selected id
async function getEmpTaskById(req, res) {
  try {
      const taskId = req.params.id;
      console.log("TaskId:", taskId)
      const task = await empTaskService.getTaskById(taskId);
      res.status(200).json(task);
  } catch (error) {
      console.error('Error fetching task by ID:', error);
      res.status(500).json({ error: 'Failed to fetch task by ID' });
  }
}



//View task list
async function viewEmpTask(req, res) {
    try {
        const allTasks = await empTaskService.getAllTasks();
        console.log('All tasks:', allTasks);
  
        res.status(200).json({ success: true, data: allTasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error in retrieving task data' });
    }
  };

//Add employee tasks
async function addEmpTask(req, res) {
    console.log('body:', req.body);
      try {
        const taskData = req.body;
        console.log("Task data:", taskData);
  
        const newTask = await empTaskService.addEmpTask(taskData);
          res.status(200).json({ success: true, data: newTask, message: 'New Task added successfully' });
      } catch (error) {
          console.error(error); 
          res.status(500).json({ success: false, error: 'Error in adding Task' + error.message });
      }
  };


//Update employee tasks
async function updateEmpTask(req, res) {
    try {
      const { id } = req.params;
      const taskData = req.body;
      console.log('Update Task:', taskData);

      const updatedTask = await empTaskService.updateEmpTask(id, taskData);
      console.log('Updated Task:', updatedTask);
      res.status(200).json({ success: true, data: updatedTask, message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error in updating Task' + error.message });
    }
};


//Delete tasks
async function deleteEmpTask(req, res) {
    try {
      const { id } = req.params;
      await empTaskService.deleteEmpTask(id);

      res.status(200).json({ success: true, data: {},message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error in deleting Task' + error.message });
    }
};


//Update employee tasks status
async function updateTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log('Update Task Status:', status);

    const updatedTaskStatus = await empTaskService.updateEmployeeStatus(id, status);
    console.log('Updated Task:', updatedTaskStatus);
    res.status(200).json({ success: true, data: updatedTaskStatus, message: 'Task updated successfully' });
  } catch (error) {
      res.status(500).json({ success: false, error: 'Error in updating Task' + error.message });
  }
};

const viewTaskByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await empTaskService.getTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

  module.exports = { 
    getEmpTaskById,
    viewEmpTask,
    addEmpTask,
    updateEmpTask,
    deleteEmpTask,
    updateTaskStatus,
    viewTaskByUserId
};