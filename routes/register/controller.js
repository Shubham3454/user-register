
const responses        = require('../utility/responses');
const constants        = require('../properties/constants');
const commonFunction   = require('../properties/commonFunction')
const md5              = require('md5');
const registerServises = require('./services')


const thisModule = "register user";

exports.checkUser    = checkUser;
exports.registerUser = registerUser;

async function checkUser(req, res) {
          req.apiReference.module = thisModule;
    const apiReference            = req.apiReference;
    let   opts                    = req.body;

    try {
        console.log("+++++======hi")
        let isUserRegistered = false;
        let registeredUser   = await registerServises.fetchUser(apiReference, opts.email);
        console.log("11111registeredUser1", registeredUser)
        if (registeredUser && registeredUser.length) {
            isUserRegistered = true;
        }
        return responses.actionCompleteResponse(res, { isUserRegistered });
    } catch (error) {
        console.log("*****************222", error)
        return responses.sendActionFailedResponse(res, error.message);
    }
}


async function registerUser(req, res) {
    req.apiReference.module = thisModule;
    const apiReference = req.apiReference;
    let opts = req.body;

    try {
        let registeredUser = await registerServises.fetchUser(apiReference, opts.email);
        console.log("11111registeredUser1", registeredUser)
        if (registeredUser && registeredUser.length) {
            throw new Error(constants.responseMessages.USER_ALREADY_REGISTERED);
        }
            opts.password     = md5(opts.password);
        let accessToken       = md5(opts.password + new Date().getTime() + commonFunction.generateRandomStringAndNumbers(8));
            opts.access_token = accessToken
        console.log("--------opts111", opts.access_token)
        opts.created_at = new Date();
        opts.user_id    = Number(new Date())

        let insertedUser = await registerServises.insertUser(apiReference, opts);
        console.log("--------------+++++++++++++++---------", insertedUser)
        if (!insertedUser) {
            throw new Error(constants.responseMessages.ACTION_FAILED_RESPONSE);
        }

        return responses.actionCompleteResponse(res);
    } catch (error) {
        console.log("********", error)
        return responses.sendActionFailedResponse(res, error.message);
    }
}