const constants      = require('../properties/constants')
const commonFunction = require('../properties/commonFunction')

exports.fetchUser  = fetchUser;
exports.insertUser = insertUser;

async function fetchUser(apiReference, opts) {
    try {
        let collectionName = config.get("databaseSettings.collection_name.tb_users")

        const user = await commonFunction.fetchMongoDataPromisified(apiReference, collectionName, { email: opts })
        console.log("===========", user)
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


async function insertUser(apiReference, opts) {
    try {
        const user = await commonFunction.insertMongoPromisified(apiReference, config.get('databaseSettings.collection_name.tb_users'), opts)
        console.log("===========", user)
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}
