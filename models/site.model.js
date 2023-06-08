const mongoose = require("mongoose");

const SiteModel = mongoose.model(
    'Site',
    new mongoose.Schema({
        name: { type: String, required: true },
    })
    );

module.exports = SiteModel;