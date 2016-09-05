var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/maori', function(req, res, next) {
 db.Category.findAll().then(function(categories){
    res.send(categories);
   //res.render('index.ejs', { title: 'Express' , data: categories});
 });
});


/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD

    /*  res.sendStatus(200);
     res.render('index', { title: 'Express' });*/
    res.render('home.ejs', { title: 'Express' });


    // db.Category.findAll().then(function(categories){
    //   res.render('index', { title: 'Express', data: categories});
    // });
=======
    db.Category.findAll().then(function(categories){
      res.render('home.ejs', { title: 'Express', data: categories});
    });
>>>>>>> 98d83db513fe7ae78cef6f56b4aec4ce370d46e6
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









//Individual Item Route
router.get('/additem', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('addItem.ejs', { title: 'Express', data:categories });
    });
});



//404 Routes
router.get('*', function(req, res, next){
    res.statusCode = 404;
    // res.send('None shall pass');
    res.render('404.ejs', { title: 'Express' });
});

module.exports = router;