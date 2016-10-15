var express = require('express');
var router = express.Router();
var db = require('../lib/db');

//Gets the category page where its id = the parameter given. This displays all of the items within the category
router.get('/:id/view', function(req, res, next) {
    res.redirect('/category/' + req.params.id +  '/view/1');

});

//If a category has more than 6 items the items are split into individual pages
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
                db.Category.findAll({
                order: 'id ASC'
                }).then(function(categories){
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