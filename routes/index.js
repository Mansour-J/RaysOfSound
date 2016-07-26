var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'khmer.ecs.vuw.ac.nz',
    user : 'root',
    password : 'secret',
    database : 'ros_test'
});

console.log("connecting");
connection.connect(function(err, results){
   if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    }
    console.log("connected.");
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
