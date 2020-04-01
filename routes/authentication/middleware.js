const responses = require('../utility/responses')
const constant = require('../properties/constants')

exports.authenticate = authenticate


async function authenticate(req, res, next) {
    try {
        let secret_key = req.body.secret_key
        let key        = config.get("sharedSecret.secret_key")
        if (key == secret_key) {
            return next();
        }
        return responses.invalidSharedSecret(res, constant.responseMessages.INVALID_SHARED_SECRET);
    } catch (error) {
        console.log(error)
        return responses.sendActionFailedResponse(res,"SOMETHING WENT WRONG");
    }
}