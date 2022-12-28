const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://127.0.0.1:27017';
const dbname = 'Camunited';
const collectionname = 'customers'; //Only one collection!

MongoClient.connect(url)
.then((error, client) => {
    assert.equal(error, null);
    const db = client.db(dbname);
    dboper.insertDocument(db, { id: 1, name: 'Austin Mattix', email: 'connor11mat@gmail.com', username:'austin', birth_year:1985 } , 'customers')
        .then((result) => {
            console.log('Added Document:\n ', result.ops, '\n');
            return dboper.findDocument(db, 'customers')
        })
        .then((docs) => {
            console.log('Found document:\n', docs, '\n');
            return dboper.updateDocument(db, { name: 'Austin Mattix' }, { email: 'connor22mat@gmail.com' }, 'customers')
        })
        .then((result) => {
            console.log('Updated document successfully:\n', result, '\n');
            return dboper.findDocument(db, 'customers')
        })
        .then((docs) => {
            console.log('Found document:\n', docs, '\n');
            return db.dropCollection('customers')
        })
        .then((result) => {
            console.log('Drop Collection successfully:\n', result, '\n');
            return db.dropCollection('passwords')
        })
        .then((result) => {
            console.log('Drop Collection successfully:\n', result, '\n');

            client.close();
        })
        .catch((error) => console.log(error));
    })
.catch((error) => console.log(error));

                // Use DBOperation instead!
    // const collections = db.collection(collectionname);

    // collections.insertOne({ id: 7, name: 'Kruy Soklim', email: 'kruysolim101@gmail.com', username:'soklim101', birth_year:1995 }, (error, result) => {
    //     assert.equal(error, null);
    //     if (error) return console.log(`Error: ${error.message}`);
    //     else console.log('Data you given added successfully!');
    //     console.log(result);
    //     console.log('');

    //     collections.find({}).toArray((error, docs) => {
    //         assert.equal(error, null);
    //         if (error) return console.log(`Error: ${error.message} \n`);
    //         else console.log('Found successfully all data:');
    //         console.log(docs);
    //         console.log('');

    //         db.dropCollection(collectionname, (error, result) => {
    //             assert.equal(error, null);
    //             if (error) return console.log(`Error: ${error.message} \n`);
    //             else console.log('Data have been deleted!');
    //             console.log(result);

    //             client.close();
    //         });
    //     });
    // });
// });