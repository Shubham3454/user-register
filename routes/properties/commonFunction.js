const constant = require('./constants')
const mongo    = require('../mongo')





exports.fetchMongoDataPromisified      = fetchMongoDataPromisified;
exports.insertMongoPromisified         = insertMongoPromisified;
exports.generateRandomStringAndNumbers = generateRandomStringAndNumbers;



function fetchMongoDataPromisified(apiReference, collectionName, filter) {
    return new Promise((resolve, reject) => {
        mongo.fetchData(apiReference, filter, collectionName, function (err, result) {
            if (err) {
                console.log("errorrrrrr ", err)
                return reject(err);
            }
            return resolve(result);
        })
    })
}




function insertMongoPromisified(apiReference, collectionName, dataToInsert) {
    return new Promise((resolve, reject) => {
        mongo.insertData(apiReference, collectionName, dataToInsert, function (result) {
            console.log("11112222333,", result)
            if (result.success) {
                resolve(result.success);
            } else {
                reject(constant.responseMessages.ACTION_FAILED_RESPONSE);
            }
        })
    })
}


function generateRandomStringAndNumbers(len) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};