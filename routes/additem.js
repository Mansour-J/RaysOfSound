var express = require('express');
var router = express.Router();
var db = require('../lib/db');

//Individual Item Route
router.get('/', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('addItem.ejs', { title: 'Express', data:categories });
    });
});

router.post('/create', function(req, res, next){
    db.Item.create({
        category_id: 1,
        item_name: req.body.ItemTitle,
        location: req.body.ItemInfo,
        description: req.body.ItemContent,
        image: req.body.ItemImage,
        user_id: 1
    }).then(function(item){
        db.Audio.create({
            item_id: item.id,
            duration: "3:00",
            artist: "tempArtist",
            audio_location: req.body.ItemAudio
        }).then(function(){
            db.Audio.findAll().then(function(items){
                res.send(items);
            });
        })
    })
});

module.exports = router;