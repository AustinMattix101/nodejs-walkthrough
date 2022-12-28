 /**
 * Module dependencies.
 */
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var figlet = require('figlet');
const config = require("./config");
var cors = require("cors");
const nunjucks = require("nunjucks");


    // Import Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profilesRouter = require('./routes/profiles');
var uploadRouter = require('./routes/uploadRouter');

    // Import Models
const Profiles = require('./models/profiles');
    // Database Connection
// const url = 'mongodb://127.0.0.1:27017/auth';
const connect = mongoose.connect(config.mongoUrl_local, { useNewUrlParser: true, useUnifiedTopology: true}); // , useCreateIndex: true, useFindAndModify: false 
    // Verify Database Connection
async function run() {
  connect.then(db => {
    console.log('\n Connected Successfully to The Database!\n\n');

    // console.log('Connection details: \n', db);
    figlet('CAMUNITED', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
    });
    
  }, err =>{ console.log('Failed to Connecting into The Database! \n', err) });
}
run();

var app = express();

app.all('*', (req, res, next) => {
  if (req.secure) return next();
  else { 
    res.redirect(307, "https://" + req.hostname + ":" + app.get("secPORT") + req.url);
  }
});

      // Middlewares Declaration
// view engine setup // all environments
nunjucks.configure("public", {express: app});
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('89475-49953-20103-74123'));
// app.use(session({
//   name: 'session-id',
//   secret: '84585-48473-20785-78423',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);


  // console.log(req.header);
  // console.log(req.signedCookies);
  // console.log(req.session);
    // For only Cookies: (!req.signedCookies.user)
    // For use window prompt sign in: var authHeader = req.headers.authorization;
    //if (!authHeader) {
       // res.setHeader('WWW-Authenticate', 'Basic');
    //}
    // var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    // var username = auth[0];
    // var password = auth[1];

    // if (username === 'austin' && password === 'ShunShenZe@23712') {
    //   req.session.user = 'austin';  // Use Cookies Only: res.cookie('user', 'austin', { signed: true });
    //   next();
    //   } else {
    //     let err = new Error('You are not authenticated!').status(401);
    //     res.setHeader('WWW-Authenticate', 'Basic');
    //     return next(err);
    //   }

   // For Use Cookies Only: (req.signedCookies.user === 'austin')
 // Authorization: Basic YXVzdGluOlNodW5TaGVuWmVAMjM3MTI=
  // Cookies: DyeADgFIlElOS%2BelQgH%2Fy5J0YcLySTo%2FM

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', profilesRouter);
app.use('/imgUpload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
