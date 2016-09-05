var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function(req, res, next) {

    db.Category.findAll().then(function(categories){
        res.render('category.ejs'/*TODO replace with categoy page*/, { title: 'Express', data: categories});
    });


});

router.get('/:id/view', function(req, res, next) {
    var id = req.params.id;
    sequelize.query("SELECT * FROM Items WHERE item_id='id' " +
        "INNER JOIN Audio ON Items.item_id=Audio.item_id",
        { type: sequelize.QueryTypes.SELECT})
        .then(function (items) {
            res.render('category.ejs', { title: 'Express', data: items});
        })




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