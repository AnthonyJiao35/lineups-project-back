const mongoose = require("mongoose");

const SideModel = mongoose.model(
    'Side',
    new mongoose.Schema({
        name: { type: String, required: true},
    }));

module.exports = SideModel;