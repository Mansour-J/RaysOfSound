var express = require('express');
var router = express.Router();
var pg = require('pg').native;

var database = "postgres://vxrebqhuwdodxj:4GH-oj44aX1A6W5i2OXIIfhViN@ec2-184-73-196-82.compute-1.amazonaws.com:5432/dddpqqg2ntj8g8?ssl=true";
var client = new pg.Client(database);
client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

pg.connect(database, function(err, client, done){
 	if(err){
 		console.error('Could not connect to the database');
 		console.error(err);
 		return;
 	}
 	else {
 		console.log('connected to database')
 	}
 });


module.exports = router;
