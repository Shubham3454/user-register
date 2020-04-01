const constants = require('../properties/constants');

exports.actionCompleteResponse = function (res, data, msg) {
    const response = {
        "message": msg || constants.responseMessages.ACTION_COMPLETE,
        "status" : constants.responseFlags.ACTION_COMPLETE,
        "data"   : data || []
    };
    res.send(JSON.stringify(response));
};

exports.sendActionFailedResponse = function (res, msg) {
    const response = {
        message: msg || constants.responseMessages.ACTION_FAILED_RESPONSE,
        status : constants.responseFlags.ACTION_FAILED_RESPONSE,
        data   : []
    }
    res.send(response);
};

exports.invalidSharedSecret = function (res, msg) {
    const response = {
        message: msg || constants.responseMessages.INVALID_SHARED_SECRET,
        status : constants.responseFlags.ACTION_FAILED_RESPONSE,
        data   : []
    };
    res.send(response);
};



