const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('../authenticate'); // Using to permit specific user or operation by restriction!

    // Declare Routers
const profilesRouter = express.Router();

    // Import Models
const Profiles = require('../models/profiles');

    // Middlewares Declaration
profilesRouter.use(express.json());
const cors = require("./cors");
const { Router } = require("express");

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

function validateprofiles(profiles) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(profiles);
}

profilesRouter          // Add authenticate.verifyUser in miiddleware to restrict any circumstances like POST, PUT and DELETE etc.!
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
    .post('/api/profiles', authenticate.verifyUser, (req, res, next) => {

        Profiles.create(req.body).then(profiles => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profiles);
        }, err => next(err)).catch( err => next(err));

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
});

profilesRouter
    .route('/api')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
    .get((_req, res) => {
        res.status(200).send('Welcome to Camunited Server!');
});

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
                        //Populate Schema here
profilesRouter
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
    .get('/api/profiles', (_req, res, next) => {
        Profiles.find({})
        // .populate('users.fiance')
        .then(profiles => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profiles);
            }, err => next(err)).catch(err =>next(err));
        // res.status(200).send(profiles);
});

profilesRouter
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
    .get('/api/profiles/:id', (req, res, next) => {

        Profiles.findById(req.params.id)
        // .populate('bio.partner')
        .then(profiles => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profiles);
        }, err => next(err)).catch(err =>next(err));

        // const profiles = profiles.find(c => c.id === parseInt(req.params.id));
        // if (!profiles) return res.status(404).send(`The profiles with the given ID: ${req.params.id} was not fonud`);
        // res.status(200).send(profiles);
});


profilesRouter
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
    .put('/api/profiles/:id', authenticate.verifyUser, (req, res, next) => {

        Profiles.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(profiles => {
            console.log('Update Operation is completed successfully! \n', profiles);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profiles);
        }, err => next(err)).catch(err =>next(err));

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
});

profilesRouter
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
    .delete('/api/profiles/:id',authenticate.verifyUser, (req, res, next) => {

        Profiles.findByIdAndRemove(req.params.id).then(profiles => {
            console.log('Delete Operation is completed successfully! \n', profiles);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(`Delete Operation is completed successfully! \n ${profiles}`);
        }, err => next(err)).catch(err =>next(err));

        // // look up the course
        // // Not existing, return 404 
        // const profiles = profiles.find(c => c.id === parseInt(req.params.id));
        // if (!profiles) return res.status(404).send(`The profiles with the given ID: ${req.params.id} was not fonud`);

        // // Delete
        // const index = profiles.indexOf(profiles);
        // profiles.splice(index, 1);

        // // Return the same course
        // res.status(200).send(profiles);
});

// PORT
// const hostname = 'localhost' || '127.0.0.1';
// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Server is listening on http://${hostname}:${port}...`));

module.exports = profilesRouter;