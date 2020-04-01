


exports.fetchData = function (apiReference, filter, collectionName, cb) {
    console.log("#########", collectionName, "!!!!!!!!!", filter)
    var cursor = db.collection(collectionName).find(filter);

    if (cursor) {
        cursor.toArray(function (err, result) {
            cursor.close();
            if (err) {
                return cb(err);
            }
            else {
                return cb(null, result);
            }
        });
    }
    else {
        throw new Error(constant.responseMessages.ACTION_FAILED_RESPONSE);
    }
}


exports.insertData = function (apiReference, collectionName, data, cb) {
    console.log("#########", collectionName, "!!!!!!!!!", data)
    db.collection(collectionName).insertOne(data, function (err, data) {
        if (err) {
            cb({ success: false });
        } else {
            cb({ success: true });
        }
    });
}
