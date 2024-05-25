const express = require('express');
const router = express.Router();
const empTaskController = require('../controller/empTaskController');

console.log("task route..");
router.get('/view-byid/:id', empTaskController.getEmpTaskById);

router.get('/view-task', empTaskController.viewEmpTask);

router.post('/add-empTask', empTaskController.addEmpTask);

router.post('/update-empTask/:id', empTaskController.updateEmpTask);

router.post('/delete-empTask/:id', empTaskController.deleteEmpTask);

router.post('/update-status/:id', empTaskController.updateTaskStatus);

module.exports = router;