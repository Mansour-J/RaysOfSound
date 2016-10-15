var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var helper = require('../lib/helper');

//Individual Item Route
router.get('/',helper.authedOrLogin, function(req, res, next){
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('addItem.ejs', { title: 'Add Item', user: req.user,  data:categories });
    });
});

router.post('/create', helper.authedOrLogin, function(req, res, next){
    db.Category.findOne({where: {title: req.body.ItemCategory}
    }).then(function(category)
    {
        db.Item.create({
            category_id: category.id,
            item_name: req.body.ItemTitle,
            location: req.body.ItemInfo,
            description: req.body.ItemContent,
            image: req.body.ItemImage,
            metadata: req.body.ItemData,
            user_id: 1
        }).then(function (item) {
            db.Audio.create({
                item_id: item.id,
                duration: "3:00",
                artist: "tempArtist",
                audio_location: req.body.ItemAudio
            }).then(function () {
                db.Item.findAll().then(function (items) {
                    res.send(items);
                });
            })
        })
    })
});

module.exports = router;