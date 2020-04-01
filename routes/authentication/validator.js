const Joi = require('joi');

const apiReferenceModule = 'validator';

exports.registerUser = registerUser;
exports.checkUser    = checkUser;

async function registerUser(req, res, next) {
    req.apiReference = {
        module: apiReferenceModule,
        api: "registerUser"
    };
    let schema = Joi.object().keys({
        name      : Joi.string().required(),
        email     : Joi.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
        password  : Joi.string().required(),
        secret_key: Joi.string().required()

    });
    let validFields = validateFields(req.apiReference, req.body, schema);
    if (!validFields) {
        return res.status(400).send("INVALID REQUEST");
    }
    return next();
}

async function checkUser(req, res, next) {
    req.apiReference = {
        module: apiReferenceModule,
        api: "checkUser"
    };
    let schema = Joi.object().keys({
        email     : Joi.string().required(),
        secret_key: Joi.string().required()
    });
    let validFields = validateFields(req.apiReference, req.body, schema);
    if (!validFields) {
        return res.status(400).send("INVALID REQUEST");
    }
    return next();
}

function validateFields(apiReference, req, schema, msg) {
    var validation = Joi.validate(req, schema);
    if (validation.error) {
        var errorReason = validation.error.details !== undefined ? (msg ? msg : validation.error.details[0].message) : 'Parameter missing or parameter type is wrong';
        console.log(validation.error.details, errorReason);
        return false;
    }
    return true;
}