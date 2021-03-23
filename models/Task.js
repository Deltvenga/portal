const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    currentUserId: {
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    ownerId: {
        type: String
    },
    endDate: {
        type: String
    },
    currentState: {
        type: Number
    }

});
module.exports = mongoose.model('task', TaskSchema);