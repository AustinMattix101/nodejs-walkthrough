const mongoose = require('mongoose');

const Customers = require('./models/customers');

const url = 'mongodb://127.0.0.1:27017/Camunited';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// async function run() {
    
//     try {
//       res = await collection.updateOne(
//         { name: "Mount McKinley" },
//         { $set: { meters: 6190 } },
//       );
//       console.log(`Updated ${res.result.n} documents`);
//     } catch (err) {
//       console.error(`Something went wrong: ${err}`);
//     }
//   }

// collection
//   .updateOne({ name: "Mount McKinley" }, { $set: { meters: 6190 } })
//   .then(
//     res => console.log(`Updated ${res.result.n} documents`),
//     err => console.error(`Something went wrong: ${err}`),
//   );

// collection.findOneAndUpdate(
//     { name: "Barronette Peak" },
//     { $set: { name: "Baronette Peak" } },
//     {},
//     function(error, result) {
//       if (!error) {
//         console.log(`Operation completed successfully: ${result.ok}`);
//       } else {
//         console.log(`An error occurred: ${error}`);
//       }
//     },
//   );

// deleteOne({ name: "Mount Doom" })
//   .then(result => {
//     if (result.deletedCount !== 1) {
//       throw "Could not find Mount Doom!";
//     }
//     return new Promise((resolve, reject) => {
//       ...
//     });
//   })
//   .then(result => console.log(`Vanquished ${result.quantity} Nazgul`))
//   .catch(err => console.error(`Fatal error occurred: ${err}`));

// async function run() {
//     ...
//     // WARNING: this snippet may cause an infinite loop
//     const cursor = collection.find();
  
//     while (cursor.hasNext()) {
//       console.log(cursor.next());
//     }
//   }

// async function run() {
//     ...
//     // WARNING: this snippet throws a MongoError
//     const cursor = collection.find();
  
//     while (cursor.hasNext()) {
//       console.log(await cursor.next());
//     }
//   }

// async function run() {
//     ...
//     // WARNING: this snippet prints Promises instead of the objects they resolve to
//     const cursor = collection.find();
  
//     while (await cursor.hasNext()) {
//       console.log(cursor.next());
//     }
//   }

// async function run() {
//     ...
//     const cursor = collection.find();
  
//     while (await cursor.hasNext()) {
//       console.log(await cursor.next());
//     }
//   }

async function run() {
    connect.then(db => {
        console.log('Connected successfully to the server!\n');
        // console.log('Connection details: \n', db);
            // Old method: var newCustomers = Customers({...});
    }, err =>{ console.log('Failed to connecting to the server! \n', err) });
    try {
        res = await Customers
        .create({
            id: 1,
            firstname: 'Austin',
            middlename: 'Connor',
            lastname: 'Mattix',
            fullname: 'Austin Connor Mattix',
            birthdate: '2003-03-17T17:57:28.556094Z',
            sex: 'Male',
            address: 'Charkamorn, Phnom Penh, Cambodia 12523',
            tel: +85510358336,
            country: 'Cambodia'
        });
    } catch (err) { console.error(`Something went wrong: ${err}`); }
    
    try {
        res = await
        Customers.findOneAndUpdate(
            { address: 'Charkamorn, Phnom Penh, Cambodia 12523' },
            { $set: { address: 'National Road 2. Charkamorn, Phnom Penh, Cambodia 12523.' } },
            {},
            (error, result) => {
                if (!error) {
                    console.log(`Operation completed successfully: ${result.ok}`);
                } else {
                    console.log(`An error occurred: ${error}`);
                }
            }    
        );
    } catch (err) { console.error(`Something went wrong: ${err}`); }
    mongoose.connection.close().catch(err => { console.log(`Something went wrong: ${err}`) });      
}
run();

// .then(customer => {     // Old method: newCustomers.save()...
//     console.log(customer);
//     Customers.findByIdAndUpdate(customer._id, { $set: { address: 'National Road 2. Charkamorn, Phnom Penh, Cambodia 12523.'}}, { new: true }).exec(); // New method: Customers.find({}).exec();

// }).then(res => {
//     console.log(res);
//     Customers.bio.push({ accuracy:80, shortbio: 'This is short bio!', fullbio: 'This full bio statement!' });
//     return Customers.bio.save();
    
// }).then((customer) => {
//     console.log(customer);
//     return Customers.findOneAndRemove('customers');
// }).then(() => mongoose.connection.close()).catch(err => { console.log(err) });

// connect.then(db => {
//     console.log('Connected successfully to the server!');
//         // Old method: var newCustomers = Customers({...});
//         run();
// });