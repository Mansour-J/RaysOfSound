var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function(req, res, next) {
    db.Category.findAll().then(function(categories){
        res.render('allCategories.ejs', {data: categories, user:req.user});
    });
});

router.get('/:id/view', function(req, res, next) {
    res.redirect('/category/' + req.params.id +  '/view/1');

});

router.get('/:id/view/:page', function(req, res, next) {
    var page = req.params.page;
    var itemPerPage = 6;
    var start = (page - 1) * 6;

    console.log(page);
    console.log("REQ:" + req.params.id);

    var itemLength = 0;
    if(!isNaN(page)){
        console.log(page);
        db.Item.findAll({
                where: {
                    category_id: req.params.id
                }
            }).then(function (itemAll) {
            itemLength = itemAll.length;

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
                        console.log("HIE");
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
    console.log(page);
});

module.exports = router;