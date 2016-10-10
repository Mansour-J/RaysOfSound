var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function(req, res, next) {
    console.log("index");
    db.Category.findAll().then(function(categories){
        res.render('allCategories.ejs', {data: categories, user:req.user});
    });
});

router.get('/:id/view', function(req, res, next) {
/*
    db.Audio.findAll().then(function (audio){
      db.Item.findAll({
            where: {
                category_id: req.params.id
            }
        }).then(function (items){
            db.Category.findAll().then(function(categories){
              if (items.length != 0){
                res.render('category.ejs', { title: 'Express', items: items, audio: audio, data: categories, user:req.user});
              }
              else {
                res.redirect('/error');
              }
            });
        });
    });*/

    res.redirect('/category/' + req.params.id +  '/view/1');

});

router.get('/:id/view/:page', function(req, res, next) {
    var page = req.params.page;
    var itemPerPage = 6;
    var start = (page - 1) * 6;

    var itemLength = 0;
    if(!isNaN(page)){
        db.Item.findAll({
                where: {
                    category_id: req.params.id
                }
            }).then(function (itemAll) {
            console.log("=============================================== ITEMLENGTH " + itemLength + " ========================================");

            itemLength = itemAll.length;
            console.log("=============================================== ITEMLENGTH " + itemLength + " ========================================");



        db.Audio.findAll().then(function (audio){
            db.Item.findAll({
                where: {
                    category_id: req.params.id
                },
                limit: itemPerPage,
                offset: start
            }).then(function (items){
                db.Category.findAll().then(function(categories){
                    if (items.length != 0){
                        res.render('category.ejs', { title: 'Express', itemLength: itemLength, items: items, audio: audio, data: categories, user:req.user});
                    }
                    else {
                        res.redirect('/error');
                    }
                });
            });
        });

        });
    }

});

router.get('/:id/edit', function(req, res, next) {

  res.render('category.ejs'/*TODO replace with categoy page*/, { title: 'Express' });


});

router.put('/:id/edit', function(req, res, next) {

  res.render('category.ejs'/*TODO replace with categoy page*/, { title: 'Express' });


});

router.get('/:id/destroy', function(req, res, next) {

  res.render('category.ejs'/*TODO replace with categoy page*/, { title: 'Express' });


});

module.exports = router;