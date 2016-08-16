var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/maori', function(req, res, next) {
	
/*  res.sendStatus(200);
  res.render('index', { title: 'Express' });*/
  res.render('index.ejs', { title: 'Express' });

 // db.Category.findAll().then(function(categories){
 //   res.render('index', { title: 'Express', data: categories});
 // });

});


/* GET home page. */
router.get('/', function(req, res, next) {

    /*  res.sendStatus(200);
     res.render('index', { title: 'Express' });*/
    res.render('home.ejs', { title: 'Express' });

    // db.Category.findAll().then(function(categories){
    //   res.render('index', { title: 'Express', data: categories});
    // });

});


//TET Routes
router.get('/test', function(req, res, next){
	db.Category.findAll().then(function(categories){
    res.send(categories);
  });
});


//Contact Us Routes
router.get('/contactus', function(req, res, next){
    res.render('contactus.ejs', { title: 'Express' });
});


//Contact Us Routes
router.get('/individual', function(req, res, next){
    res.render('IndividualItem.ejs', { title: 'Express' });
});


//Individual Route
router.get('/individual', function(req, res, next){
    res.render('IndividualItem.ejs', { title: 'Express' });
});



router.get('*', function(req, res, next){
    res.render('404.ejs', { title: 'Express' });
});

module.exports = router;