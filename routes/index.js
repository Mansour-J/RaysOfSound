var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var passwordHash = require('password-hash');

/* GET home page. */
/*
router.get('/maori', function(req, res, next) {
 db.Category.findAll().then(function(categories){
    res.send(categories);
   //res.render('index.ejs', { title: 'Express' , data: categories});
 });
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
    db.Category.findAll().then(function(categories){
      res.render('home.ejs', { title: 'Express', data: categories});
    });
});


//TET Routes
router.get('/test', function(req, res, next){
	db.Category.findAll().then(function(categories){
    res.send(categories);
  });
});

//About Us Routes
router.get('/aboutus', function(req, res, next){
    res.render('contactus.ejs', { title: 'Express' });
});

//Contact Us Routes
router.get('/contactus', function(req, res, next){
    res.render('contactus.ejs', { title: 'Express' });
});


//Individual Item Route
router.get('/individual', function(req, res, next){
    res.render('IndividualItem.ejs', { title: 'Express' });
});



//Encryption Route
router.get('/encryption', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('encryption.ejs', { title: 'Express', data: categories, hashed:  JSON.stringify(hashedPassword)});
    });
});







var hashedPassword = passwordHash.generate('mansour');

console.log(hashedPassword); // sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97

/*


*/
console.log(passwordHash.verify('mansour', 'sha1$120660af$1$d76a9218180d5508e0dd3fff9f6c88ab9d0f3e9a'));
console.log(passwordHash.verify('mansour', 'sha1$ec91d7f9$1$30d8cdae74d7691ca2aa3fe6de149ef3a3514a9b'));
console.log(passwordHash.verify('mansour', 'sha1$9912b9e7$1$c571a8b3c89089776f4ad194ed7a5356d567a153'));


//Individual Item Route
router.get('/additem', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('addItem.ejs', { title: 'Express', data:categories});
    });
});



//404 Routes
router.get('*', function(req, res, next){
    res.statusCode = 404;
    // res.send('None shall pass');
    res.render('404.ejs', { title: 'Express' });
});

module.exports = router;