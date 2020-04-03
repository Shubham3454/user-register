const constants = require('../properties/constants');

exports.actionCompleteResponse = function (res, data, msg) {
    const response = {
        "message": msg || constants.responseMessages.ACTION_COMPLETE,
        "status" : constants.responseFlags.ACTION_COMPLETE,
        "data"   : data || {}
    };
    res.send(JSON.stringify(response));
};

exports.sendActionFailedResponse = function (res, msg, data,status) {
    const response = {
        message: msg || constants.responseMessages.ACTION_FAILED_RESPONSE,
        status : status || constants.responseFlags.ACTION_FAILED_RESPONSE,
        data   : data || {}
    }
    res.send(response);
};

exports.invalidSharedSecret = function (res, msg) {
    const response = {
        message: msg || constants.responseMessages.INVALID_SHARED_SECRET,
        status : constants.responseFlags.UNAUTHORIZED,
        data   : {}
    };
    res.send(response);
};



