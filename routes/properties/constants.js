
exports.responseMessages = {
    "ACTION_COMPLETE"        : "success",
    "ACTION_FAILED_RESPONSE" : "Something went wrong.Please try again",
    "INVALID_SHARED_SECRET"  : "Invalid Shared Secret",
    "USER_ALREADY_REGISTERED": "user is  already registered",
    "ADD_CAPTCHA"            : "Add captcha",
    "INVALID_REQUEST"        : "invalid request",
    "INVALID_EMAIL"          : "invalid email",

}

exports.responseFlags = {
    ACTION_FAILED_RESPONSE: 500,
    ACTION_COMPLETE       : 200,
    UNAUTHORIZED          : 401,
    BAD_REQUEST           : 400,
    NOT_ACCEPTABLE        : 406
};