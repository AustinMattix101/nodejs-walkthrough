var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require("passport");
var authenticate = require("../authenticate");
const cors = require("./cors");

router.use(express.json());
/* GET users listing. */

router
  .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
  .post('/signup', (req, res, next) => {
    const { username, email, firstname, lastname } = req.body;
    User.register(new User( { username, email, firstname, lastname, admin:false } ), req.body.password, (err, user) => {
      console.log(user);
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type','application/json');
        res.json( {err: err} );
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({ success: true, status: 'Registration Successfully!'});
        });
      }
    });
  });

router
  .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
  .post('/login', passport.authenticate('local'), (req, res) => {

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!'});
  });

router
  .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
  .get('/logout', (req, res, next) => {
    if (req.session) {
      req.session.destroy();
      res.clearCookie('session-id').redirect('/');
    } else {
      let err = new Error('You have not been logged in!').status(403);
      next(err);
    }
  });

module.exports = router;
