const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    loggedIn: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
