const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function() { return !this.googleId; } },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
