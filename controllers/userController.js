const User = require('../models/user.model.js');
require('dotenv').config()
const { application } = require('express');
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");


exports.Create = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ 
        username: username,
        email: email,
        password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user);
};


exports.GetAll = async (req, res) => {
    const user = await User.find({});
    res.send(user);
};

exports.GetOne = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
};

exports.Update = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.name = req.body.name;
    await user.save();
    res.send(user);
};

exports.Delete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};


exports.LogIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send({ message: "Email ou mot de passe incorrect." });
        }
        
        const token = jwt.sign({ _id: user._id }, process.env.JWT);
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({ user: user, auth: true, token: token });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.LogOut = async(req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnexion réussie' });
}