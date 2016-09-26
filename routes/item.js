var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id', function(req, res, next) {
  var loggedIn;
  db.Item.findAll({
    where: {
      id: req.params.id
    }
  }).then(function (items){
    db.Category.findAll().then(function(categories){
      res.render('IndividualItem.ejs', {
        title: "Uploaded", 
        data: categories,
        items: items,
        user: req.user
      });
    });
  });
});

module.exports = router;
