const LineUp = require('../models/lineup.model.js');

exports.Create = async (req, res) => {
    const { name } = req.body;

    const lineup = new LineUp({ 
        name: name,
    });

    await lineup.save();

    res.status(201).send(lineup);
};


exports.GetAll = async (req, res) => {
    const lineup = await LineUp.find({});
    res.send(lineup);
};

exports.GetOne = async (req, res) => {
    const lineup = await LineUp.findById(req.params.id);
    res.send(lineup);
};

exports.Update = async (req, res) => {
    const lineup = await LineUp.findById(req.params.id);
    lineup.name = req.body.name;
    await lineup.save();
    res.send(lineup);
};

exports.Delete = async (req, res) => {
    const lineup = await LineUp.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};
