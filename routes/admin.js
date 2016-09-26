var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function(req, res, next) {
    console.log("")
});

router.get('/allitems', function(req, res, next) {



    db.Audio.findAll().then(function (audio){
        db.Category.findAll({ }).then(function (cat){
            db.Item.findAll({ }).then(function (items){
                res.render('allitems.ejs', { title: 'Express', audio: audio, cat: cat, items: items });
            });
        });
    });



});


module.exports = router;