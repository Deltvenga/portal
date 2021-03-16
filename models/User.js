const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    login: {
        type: String
    },
    score: {
        type: Number
    },
    level: {
        type: Number
    },
    reachScore: {
        type: Number
    }
});
module.exports = mongoose.model('user', UserSchema);