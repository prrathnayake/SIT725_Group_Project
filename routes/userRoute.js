const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.post('/login', userController.userLogin);

module.exports = router;
