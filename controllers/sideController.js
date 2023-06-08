const Side = require('../models/side.model.js');

exports.Create = async (req, res) => {
    const { name } = req.body;

    const side = new Side({ 
        name: name,
    });

    await side.save();

    res.status(201).send(side);
};


exports.GetAll = async (req, res) => {
    const side = await Side.find({});
    res.send(side);
};

exports.GetOne = async (req, res) => {
    const side = await Side.findById(req.params.id);
    res.send(side);
};

exports.Update = async (req, res) => {
    const side = await Side.findById(req.params.id);
    side.name = req.body.name;
    await side.save();
    res.send(side);
};

exports.Delete = async (req, res) => {
    const side = await Side.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};