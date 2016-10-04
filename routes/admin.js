var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function(req, res, next) {
    db.Category.findAll().then(function(categories){
        res.render('admin.ejs', { title: 'Express', data: categories});
    });
});


router.get('/allitems', function(req, res, next) {
    db.Category.findAll().then(function (categories){
        db.Item.findAll().then(function (items){
            db.Audio.findAll().then(function (audio){
                res.render('allitems.ejs', { title: 'Express', data: categories, items: items, audio: audio });
            });
        });
    });
});


module.exports = router;