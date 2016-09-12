var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var htmlToText = require('html-to-text');

router.get('/', function(req, res, next) {
    console.log("")
});

router.get('/:id/view', function(req, res, next) {

    db.Audio.findAll().then(function (audio){
      db.Item.findAll({
            where: {
                category_id: req.params.id
            }
        }).then(function (items){
            res.render('category.ejs', { title: 'Express', items: items, audio: audio});
        });
    });

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