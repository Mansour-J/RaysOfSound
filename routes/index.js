var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
/*  res.sendStatus(200);
  res.render('index', { title: 'Express' });*/
  res.render('index3', { title: 'Express' });
});



module.exports = router;