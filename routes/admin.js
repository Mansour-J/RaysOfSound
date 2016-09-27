var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function(req, res, next) {
    db.Category.findAll().then(function(categories){
        res.render('admin.ejs', { title: 'Express', data: categories});
    });
});


router.get('/allitems', function(req, res, next) {

    console.log("******************************************")

    db.Audio.findAll().then(function (audio){
        db.Category.findAll({ }).then(function (cat){
            db.Item.findAll({ }).then(function (items){
                res.render('allitems.ejs', { title: 'Express', audio: audio, cat: cat, items: items });
            });
        });
    });

});


module.exports = router;