const mongoose = require("mongoose");

const LineUpModel = mongoose.model(
    'LineUp',
    new mongoose.Schema({
        name: { type: String, required: true },
        media: { type: String, required: false },
        sideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Side', required: true },
        agent: { type: String, required: true },
        roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
        siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
        map: { type: String, required: true },
    })
    );

module.exports = LineUpModel;