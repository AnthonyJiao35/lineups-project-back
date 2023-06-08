const Site = require('../models/site.model.js');

exports.Create = async (req, res) => {
    const { name } = req.body;

    const site = new Site({ 
        name: name,
    });

    await site.save();

    res.status(201).send(site);
};


exports.GetAll = async (req, res) => {
    const site = await Site.find({});
    res.send(site);
};

exports.GetOne = async (req, res) => {
    const site = await Site.findById(req.params.id);
    res.send(site);
};

exports.Update = async (req, res) => {
    const site = await Site.findById(req.params.id);
    site.name = req.body.name;
    await site.save();
    res.send(site);
};

exports.Delete = async (req, res) => {
    const site = await Site.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};