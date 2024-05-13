const express = require('express');
const router = express.Router();
const empTaskController = require('../controller/empTaskController');

console.log("task route..");
router.get('/view-byid/:id', empTaskController.getEmpTaskById);

router.get('/view-task', empTaskController.viewEmpTask)

module.exports = router;