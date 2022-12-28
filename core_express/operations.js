const assert = require('assert');
    
    // Using Promises
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};

    // DbOperation
// exports.insertDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.insertOne(document, (error, result) => {
//         assert.equal(error, null);
//         if (error) return console.log(error.message);
//         else console.log('Document added successfully to collection!', result.n);
//         callback(result);
//     });
// };

// exports.findDocument = (db, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.find({}).toArray((error, docs) => {
//         if (error) return console.log(error.message);
//         assert.equal(error, null);
//         callback(docs);
//     });
// };

// exports.removeDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.deleteOne(document, (error, result) => {
//         assert.equal(error, null);
//         if (error) return console.log(error.message);
//         else console.log('Removed document successfully!', document);
//         callback(result);
//     });
// };

// exports.updateDocument = (db, document, update, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.updateOne(document, { $set: update }, null, (error, result) => {
//         assert.equal(error, null);
//         console.log('Updated the document with', update);
//         callback(result);
//     });
// };