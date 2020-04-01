
const responses        = require('../utility/responses');
const constants        = require('../properties/constants');
const commonFunction   = require('../properties/commonFunction')
const md5              = require('md5');
const registerServises = require('./services')


const thisModule = "register user";

exports.registerUser = registerUser;


async function registerUser(req, res) {
          req.apiReference.module = thisModule;
    const apiReference            = req.apiReference;
    let   opts                    = req.body;
    let   sendCaptcha             = false;
    let status;

    try {
        let currentTime = Number(new Date());
        let previousTime = Number(new Date(new Date().getTime() - 60 * 60 * 24 * 1000))
        let findBoj ={
            ip : opts.ip,
            created_at: {
                $gte:  previousTime,
                $lt: currentTime
            }
        }
        let registeredUser = await Promise.all([registerServises.fetchUser(apiReference, { email : opts.email}),registerServises.fetchUser(apiReference,findBoj)])
        if (registeredUser && Array.isArray(registeredUser)  &&  Boolean(registeredUser[0])) {
            status = constants.responseFlags.NOT_ACCEPTABLE
            throw new Error(constants.responseMessages.USER_ALREADY_REGISTERED);
        }
        if (registeredUser && Array.isArray(registeredUser) && !opts.is_captcha_added && registeredUser[1] > 3 ) {
            sendCaptcha = true;
            status = constants.responseFlags.NOT_ACCEPTABLE
                throw new Error(constants.responseMessages.ADD_CAPTCHA);

            
        }
            opts.password     = md5(opts.password);
        let accessToken       = md5(opts.password + new Date().getTime() + commonFunction.generateRandomStringAndNumbers(8));
            opts.access_token = accessToken
        opts.created_at      = Number(new Date());

        let insertedUser = await registerServises.insertUser(apiReference, opts);
        if (!insertedUser) {
            throw new Error(constants.responseMessages.ACTION_FAILED_RESPONSE);
        }

        return responses.actionCompleteResponse(res,{send_captcha : sendCaptcha});
    } catch (error) {
        return responses.sendActionFailedResponse(res, error.message,{send_captcha : sendCaptcha},status);
    }
}