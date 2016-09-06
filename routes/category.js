var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var sequelize = require('sequelize');

router.get('/', function(req, res, next) {
    console.log("")
});

router.get('/:id/view', function(req, res, next) {

    /*  SELECT * FROM Items WHERE item_id='id'
            INNER JOIN Audio ON Items.item_id=Audio.item_id */
    var audio = db.Audio.findAll();

    var items = db.Item.findAll({
        where: {
            category_id: req.params.id
        }
    }).then(function(items){
        res.render('category.ejs', { title: 'Express', items: items, audio: audio});
    });



    /*


    //console.log("ITEMS: "+items[0]);
    //console.log("AUDIO: "+audio[0]);

    res.render('category.ejs', { title: 'Express', data: [items, audio] })

*/
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