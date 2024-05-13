const empTaskService = require('../service/empTaskService');

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


  module.exports = { 
    getEmpTaskById,
    viewEmpTask,
};