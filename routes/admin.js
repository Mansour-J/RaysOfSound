var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var helper = require('../lib/helper');


router.get('/', function (req, res, next) {
    db.Category.findAll().then(function (categories) {
        res.render('admin.ejs', {title: 'Express', data: categories});
    });
});


router.get('/view/allitems', function (req, res, next) {
    db.Category.findAll().then(function (categories) {
        db.Item.findAll().then(function (items) {
            db.Audio.findAll().then(function (audio) {
                res.render('allitems.ejs', {title: 'Express', data: categories, items: items, audio: audio});
            });
        });
    });
});

router.get('/manage/categories', function (req, res, next) {
    db.Category.findAll().then(function (categories) {
        res.render('manageCats.ejs', {title: 'Express', data: categories});
    });
});

router.post('/manage/categories', helper.isAuthenicated, function (req, res, next) {
        var loggedIn;

        var newId = [];
        var newTitle = [];

        db.Category.findAll().then(function (category) {
            for (var i = 0; i < category.length; i++) {
                newId[i] = category[i].id;
                newTitle[i] = category[i].title;
            }
            for (var i = 0; i < category.length; i++) {
                 db.Category.update({
                    title: req.body['input'+newId[i]]
                 },
                 {
                    where: { id: newId[i] }
                 });
            }
        }).then(function () {
            res.redirect('./categories');
        });
});


module.exports = router;