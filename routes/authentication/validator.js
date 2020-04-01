const Joi = require('joi');
const constants = require('../properties/constants')
const responses = require('../utility/responses')

const apiReferenceModule = 'validator';

exports.registerUser = registerUser;

async function registerUser(req, res, next) {
    req.apiReference = {
        module: apiReferenceModule,
        api: "registerUser"
    };
    try{
        req.body.ip = req.ip;
        let schema = Joi.object().keys({
            name            : Joi.string().required(),
            email           : Joi.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
            password        : Joi.string().required(),
            secret_key      : Joi.string().required(),
            ip              : Joi.string().required(),
            is_captcha_added: Joi.boolean().required(),
            
        });
        let validFields = validateFields(req.apiReference, req.body, schema);
        if (!validFields) {
            throw new Error(constants.responseMessages.INVALID_EMAIL)
        }
        return next();
    }catch (error){
        return  responses.sendActionFailedResponse(res, error.message,{},constants.responseFlags.BAD_REQUEST);
    }
}


function validateFields(apiReference, req, schema, msg) {
    let validation = Joi.validate(req, schema);
    if (validation.error) {
        let errorReason = validation.error.details !== undefined ? (msg ? msg : validation.error.details[0].message) : 'Parameter missing or parameter type is wrong';
        return false;
    }
    return true;
}