var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var helper = require('../lib/helper');

router.get('/', helper.authedOrLogin, function(req, res, next) {
    db.Category.findAll().then(function(categories){
        res.render('admin.ejs', { title: 'Admin', user: req.user,  data: categories});
    });
});


router.get('/view/allitems', helper.authedOrLogin, function(req, res, next) {
    db.Category.findAll().then(function (categories){
        db.Item.findAll().then(function (items){
            db.Audio.findAll().then(function (audio){
                res.render('allitems.ejs', { title: 'All Items', user: req.user, data: categories, items: items, audio: audio });
            });
        });
    });
});

router.get('/manage/categories', helper.authedOrLogin, function(req, res, next) {
    db.Category.findAll().then(function(categories){
        res.render('manageCats.ejs', { title: 'Manage Categories', user: req.user, data: categories});
    });
});


module.exports = router;