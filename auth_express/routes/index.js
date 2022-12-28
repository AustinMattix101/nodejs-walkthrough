var express = require('express');
var router = express.Router();
const cors = require("./cors");

router
  .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
  .get('/', function(req, res, next) {
    res.render('index.html', { message: "Hello, World!"});
  });

    /* GET home page. */
// router
//   .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200); })
//   .get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
//   });

module.exports = router;
