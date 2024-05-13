const mongoose = require('mongoose');

const taskDetails = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    assignedDate: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskDetails);

module.exports = Task;
