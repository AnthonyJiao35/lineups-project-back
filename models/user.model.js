const mongoose = require("mongoose");

const UserModel = mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }
    }));

module.exports = UserModel;