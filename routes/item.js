var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var helper = require('../lib/helper');

router.get('/:id', function(req, res, next) {
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

router.get('/:id/edit', helper.authedOrLogin, function(req, res, next) {
  var loggedIn;
  db.Item.findAll({where: {id: req.params.id}
  }).then(function (items) {
    db.Audio.findAll({where: {item_id: req.params.id}
    }).then(function (audios) {
      db.Category.findAll().then(function (categories) {
        res.render('editItem.ejs', {
          title: "Uploaded",
          data: categories,
          items: items,
          audios: audios
        });
      });
    });
  });
});

router.delete('/audio/:id', helper.isAuthenicated, function (req,res,next) {
  db.Audio.destroy({where: {
    id: req.params.id
  }
  });
});

router.post('/:id/edit', helper.isAuthenicated, function(req, res, next) {
  var loggedIn;
  db.Category.findOne({
    where: {title: req.body.ItemCategory}
  }).then(function (category) {
    db.Item.findById(req.params.id)
        .then(function (item) {
          db.Item.update({
                category_id: category.id,
                item_name: req.body.ItemTitle,
                location: req.body.ItemInfo,
                description: req.body.ItemContent,
                image: req.body.ItemImage
              },
              {
                where: {id: item.id}
              })
        }).then(function () {
      db.Item.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (items) {
        db.Category.findAll().then(function (categories) {
          res.render('editItem.ejs', {
            title: "Uploaded",
            data: categories,
            items: items
          });
        });
      });
    })
  });
});

module.exports = router;
