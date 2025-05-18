const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // other fields like name, password etc.
});

module.exports = mongoose.model('User', userSchema);
