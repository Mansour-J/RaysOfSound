var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var helper = require('../lib/helper');

//Displays an individual item 
router.get('/:id', function(req, res, next) {
  db.Item.findAll({where: {id: req.params.id}
  }).then(function (items) {
    db.Audio.findAll({where: {item_id: req.params.id}
    }).then(function (audios) {
      db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('IndividualItem.ejs', {
          title: "Uploaded",
          data: categories,
          items: items,
          audios: audios,
          user: req.user
        });
      });
    });
  });
});

//Displays the individual item as an editable page
router.get('/:id/edit', helper.authedOrLogin, function(req, res, next) {
  var loggedIn;
  db.Item.findAll({where: {id: req.params.id}
  }).then(function (items) {
    db.Audio.findAll({where: {item_id: req.params.id}
    }).then(function (audios) {
      db.Category.findAll({
        order: 'id ASC'
      }).then(function (categories) {
        res.render('editItem.ejs', {
          title: "Uploaded",
          data: categories,
          items: items,
          audios: audios,
          user: req.user
        });
      });
    });
  });
});

//deletes an audio from the database
router.delete('/audio/:id', helper.isAuthenicated, function (req,res,next) {
  db.Audio.destroy({where: {
    id: req.params.id
  }
  });
});

//deletes an entire item from the databaes
router.delete('/:id', helper.isAuthenicated, function(req, res, next){
  console.log(req.params.id);
  db.Item.destroy({
    where: {id : req.params.id}
  }).then(function (){
    res.json({ success: true, data: req.item });
  });
});

module.exports = router;
