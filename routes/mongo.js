


exports.countData = function ( apiReference,filter, collectionName, cb) {
        db.collection(collectionName).find(filter).count(function (err, count) {
             if (err){
                 return cb(err);
             }
             return cb(null, count);
         });
}


exports.insertData = function (apiReference, collectionName, data, cb) {
    db.collection(collectionName).insertOne(data, function (err, data) {
        if (err) {
            cb({ success: false });
        } else {
            cb({ success: true });
        }
    });
}


