var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var helper = require('../lib/helper');

router.get('/', helper.authedOrLogin, function(req, res, next) {
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('admin.ejs', { title: 'Admin', user: req.user,  data: categories});
    });
});



router.get('/view/allitems', helper.authedOrLogin, function(req, res, next) {
    db.Category.findAll({
        order: 'id ASC'
      }).then(function (categories){
        db.Item.findAll().then(function (items){
            db.Audio.findAll().then(function (audio){
                res.render('allitems.ejs', { title: 'All Items', user: req.user, data: categories, items: items, audio: audio });
            });
        });
    });
});

router.get('/manage/categories', helper.authedOrLogin, function(req, res, next) {
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('manageCats.ejs', { title: 'Manage Categories', user: req.user, data: categories});
    });
});

router.post('/manage/categories', helper.isAuthenicated, function (req, res, next) {
        var loggedIn;

        var newId = [];
        var newTitle = [];

        db.Category.findAll({
        order: 'id ASC'
      }).then(function (category) {
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