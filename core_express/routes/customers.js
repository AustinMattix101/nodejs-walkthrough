const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const customers = [
    { id: 1, name: 'Austin Mattix', email: 'connor11mat@gmail.com', username:'austin', birth_year:1985 },
    { id: 2, name: 'Shun ShenZe', email: 'qinshenze@11@gmail.com', username:'shunshenze', birth_year:1945 },
    { id: 3, name: 'Song Chimchek', email: 'songchimchek23712@gmail.com', username:'songchimchek23712', birth_year:1995 },
    { id: 4, name: 'Anonymous', email: 'nw101@gmail.com', username:'nw101', birth_year:2000 },
    { id: 5, name: 'Alien', email: '', username:'alien', birth_year:1998 },
    { id: 6, name: '', email: '', username:'ghost123', birth_year:1989 }
];
const passwords = [
    { id: 1, utf8passwd: 'secretpassword' },
    { id: 2, utf8passwd: '3f~rW@p.rR9(fd!' },
    { id: 3, utf8passwd: '010358336' },
    { id: 4, utf8passwd: 'seetnoFpaswod' },
    { id: 5, utf8passwd: '3f~ej424R9(fd!' },
    { id: 6, utf8passwd: '0103zzz1111158336' }
];
const access_token = [];
    // Sorting iteims of array 
// customers.sort((a, b) => {
//     const nameA = a.name.toUpperCase(); // ignore upper and lowercase
//     const nameB = b.name.toUpperCase(); // ignore upper and lowercase
//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }
  
//     // names must be equal
//     return 0;
//   });

// Joi Schema
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// // Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { } // End Joi Schema

// add customer
app.post('/api/customers', (req, res) => {

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // if (!req.body.name || req.body.name.length < 3){
    //     // 400 Bad Request
    //     res.status(404).send('Name is required and should be minimun 3 characters.');
    //     return;
    // }

    const customer = {
       id: customers.length + 1,
       name: req.body.name,
    };
    customers.push(customer);
    res.status(200).send(customer);
});


app.get('/', (req, res) => {
     res.status(200).send('Welcome to Camunited Server!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

// app.get('/api/customers/:id', (req, res) => {
//     res.send(req.params.id);
// });

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });
app.get('/api/posts/:year/:month', (req, res) => { // ?sortBy=name
    res.send(req.query);
});

app.get('/api/customers', (req, res) => {
    res.status(200).send(customers);
});

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send(`The customer with the given ID: ${req.params.id} was not fonud`);
    res.status(200).send(customer);
});



app.put('/api/customers/:id', (req, res) => {
   // look up the customer
   //if not existing, return 404
   const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send(`The customer with the given ID: ${req.params.id} was not fonud`);
   
   //validate
   // if invalid, return 400 Bad request

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   // Update customer
   customer.name = req.body.name;
   // Return the update customer
   res.status(200).send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(customer);
}

app.delete('/api/customers/:id', (req, res) => {
    // look up the course
    // Not existing, return 404 
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send(`The customer with the given ID: ${req.params.id} was not fonud`);

    // Delete
    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    // Return the same course
    res.status(200).send(customer);
});

// PORT
const hostname = 'localhost' || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on http://${hostname}:${port}...`));