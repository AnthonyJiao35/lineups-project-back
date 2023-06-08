const Joi = require('joi');

exports.SchemaValidator = (schema) => {
    return  (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error){
            res.status(400).json({ message : error.details[0].message });
        }
        else {
            req.body = value;
            next();
        }
    };
};
