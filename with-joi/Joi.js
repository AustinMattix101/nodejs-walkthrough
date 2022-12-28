import express, { json } from "express";
import { validateSignup } from "../models/Joi/UserSchema";
const app = express();

app. use(json());

const registration = [];
const sample = [
    {
        "email":"songchimchek23712@gmail.com",
        "password":"password",
        "confirmPassword":"password",
        "address": {
            "state":"CA"
        },
        "DOB": "2014-03-17",
        "referred":"true",
        "referralDetails":"Full name: Austin Mattix",
        "acceptTos":"Yes"
    }
];

app.get("/", (req, res) => {
    res.status(200).send(registration);
});
app.post("/signup", (req, res) => {
    const { error, value } = validateSignup(req.body);
    registration.push(value);

    if (error) {
        console.log(error);
        return res.status(400).send(error.details);
    }

    res.status(200).send("Succesfully signed up!");
});

app.listen(4000, () => {
    console.log("Server started on port 4000!");
});


// const profiles = [
//     { id: 1, name: 'Austin Mattix', email: 'connor11mat@gmail.com', username:'austin', birth_year:1985 },
//     { id: 2, name: 'Shun ShenZe', email: 'qinshenze@11@gmail.com', username:'shunshenze', birth_year:1945 },
//     { id: 3, name: 'Song Chimchek', email: 'songchimchek23712@gmail.com', username:'songchimchek23712', birth_year:1995 },
//     { id: 4, name: 'Anonymous', email: 'nw101@gmail.com', username:'nw101', birth_year:2000 },
//     { id: 5, name: 'Alien', email: '', username:'alien', birth_year:1998 },
//     { id: 6, name: '', email: '', username:'ghost123', birth_year:1989 }
// ];
// const passwords = [
//     { id: 1, utf8passwd: 'secretpassword' },
//     { id: 2, utf8passwd: '3f~rW@p.rR9(fd!' },
//     { id: 3, utf8passwd: '010358336' },
//     { id: 4, utf8passwd: 'seetnoFpaswod' },
//     { id: 5, utf8passwd: '3f~ej424R9(fd!' },
//     { id: 6, utf8passwd: '0103zzz1111158336' }
// ];
// const access_token = [];
    // Sorting iteims of array 
// profiles.sort((a, b) => {
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
// const schema = Joi.object({
//     username: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     repeat_password: Joi.ref('password'),

//     access_token: [
//         Joi.string(),
//         Joi.number()
//     ],

//     birth_year: Joi.number()
//         .integer()
//         .min(1900)
//         .max(2013),

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })
//     .with('username', 'birth_year')
//     .xor('password', 'access_token')
//     .with('password', 'repeat_password');


// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// // Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { } // End Joi Schema

// profilesRouter.route('/api');

// add profiles

// function validateprofiles(profiles) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });

//     return schema.validate(profiles);
// }

// const { error } = validateprofiles(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // if (!req.body.name || req.body.name.length < 3){
    //     // 400 Bad Request
    //     res.status(404).send('Name is required and should be minimun 3 characters.');
    //     return;
    // }

    // const profiles = {
    //    id: profiles.length + 1,
    //    name: req.body.name,
    // };
    // profiles.push(profiles);
    // res.status(200).send(profiles);



    // profilesRouter
//     .route('/')
//     .options(corsWithOptions, (_req, res) => { res.sendStatus(200); })
//     .get((_req, res) => {
//         res.json({ message:`Welcome to Camunited API Server!` });
// });

// profilesRouter
//     .get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// });

// profilesRouter
//     .get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

// app.get('/api/profiles/:id', (req, res) => {
//     res.send(req.params.id);
// });

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

// profilesRouter
//     .get('/api/posts/:year/:month', (req, res) => { // ?sortBy=name
//         res.send(req.query);
// });


// const profiles = profiles.find(c => c.id === parseInt(req.params.id));
        // if (!profiles) return res.status(404).send(`The profiles with the given ID: ${req.params.id} was not fonud`);
        // res.status(200).send(profiles);


        // // look up the profiles
        // //if not existing, return 404
        // const profiles = profiles.find(c => c.id === parseInt(req.params.id));
        //     if (!profiles) return res.status(404).send(`The profiles with the given ID: ${req.params.id} was not fonud`);
   
        //     //validate
        //     // if invalid, return 400 Bad request

        // const { error } = validateprofiles(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        // // Update profiles
        // profiles.name = req.body.name;
        // // Return the update profiles
        // res.status(200).send(profiles);


        // // look up the course
        // // Not existing, return 404 
        // const profiles = profiles.find(c => c.id === parseInt(req.params.id));
        // if (!profiles) return res.status(404).send(`The profiles with the given ID: ${req.params.id} was not fonud`);

        // // Delete
        // const index = profiles.indexOf(profiles);
        // profiles.splice(index, 1);

        // // Return the same course
        // res.status(200).send(profiles);