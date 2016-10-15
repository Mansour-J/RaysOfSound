var express = require('express');
var multer = require('multer');
var mime = require('mime-types');
var db = require('../lib/db');
var router = express.Router();
var helper = require('../lib/helper');
const fs = require('fs');


var images = [];
var audio = [];
var fileLocation = "./public/files/";

var storage = multer.diskStorage({
    // console.log("setting up image storage");
    destination: function(req, file, cb) {
        cb(null, './public/files');
    },
    filename: function(req, file, cb) {
        console.log(file.mimetype);
        var extension = "";
        // console.log(mime.extension(file.mimetype));
        if(mime.extension(file.mimetype) == "jpeg"){
            extension = "jpg";
        }
        else if(file.mimetype == "image/png"){
            extension = "png";
        }
        else if(file.mimetype == "audio/mpeg3"
            || file.mimetype == "audio/mp3"){
            extension = "mp3";
        }
        else if(file.mimetype == "audio/x-m4a"){
            extension = "m4a";
        }
        cb(null, Date.now() + '.' + extension); //TODO preserve file name maybe
    }
});


//filter out unsupported files
var fileFilter = function(req, file, cb){
    var extension = "";
    // console.log(mime.extension(file.mimetype));
    if(mime.extension(file.mimetype) == "jpeg"){
        extension = "jpg";
    }
    if(file.mimetype == "image/png"){
        extension = "png";
    }
    else if(file.mimetype == "audio/mpeg3"
        || file.mimetype == "audio/mp3"){
        extension = "mp3";
    }
    else if(file.mimetype == "audio/x-m4a"){
        extension = "m4a";
    }
    if(extension != "jpg"
        && extension != "png"
        && extension != "mp3"
        && extension != "m4a"
    ){
        return cb(new Error('Unsupported Format'))
    }
    else{
        cb(null, true);
    }
};

router.post('/addItem/', multer({storage: storage, fileFilter: fileFilter}).fields([{
        name: 'audioFile', maxCount: 10
    }, {
        name: 'imageFile', maxCount: 1
    }]),
    function (req, res) {
        var itemID;
        db.Category.findOne({where: {title: req.body.ItemCategory}
        }).then(function(category)
        {
            db.Item.create({
                category_id: category.id,
                item_name: req.body.ItemTitle,
                location: req.body.ItemInfo,
                description: req.body.ItemContent,
                image: req.files.imageFile[0].filename,
                user_id: 1
            }).then(function (item) {
                itemID = item.id;
                req.files.audioFile.forEach(function (it, index, array){
                    db.Audio.create({
                        item_id: item.id,
                        duration: "3:00",
                        artist: "tempArtist",
                        audio_location: it.filename
                    });
                });

            }).then(function(){
                res.redirect("../item/" + itemID);
            });
        });
    });

router.post('/:id/edit', helper.isAuthenicated, multer({storage: storage, fileFilter: fileFilter}).fields([{
        name: 'audioFile', maxCount: 10
    }, {
        name: 'imageFile', maxCount: 1
    }]),
    function (req, res) {
        var loggedIn;
        var itemID;
        db.Category.findOne({where: {title: req.body.ItemCategory}
        }).then(function(category){
            db.Item.findById(req.params.id)
                .then(function (item) {
                    if(req.files.imageFile != null) {
                        db.Item.update({
                                category_id: category.id,
                                item_name: req.body.ItemTitle,
                                location: req.body.ItemInfo,
                                description: req.body.ItemContent,
                                metadata: req.body.ItemData,
                                image: req.files.imageFile[0].filename
                            },
                            {
                                where: {id: item.id}
                            })
                    }
                    else {
                        db.Item.update({
                                category_id: category.id,
                                item_name: req.body.ItemTitle,
                                location: req.body.ItemInfo,
                                description: req.body.ItemContent,
                                metadata: req.body.ItemData
                            },
                            {
                                where: {id: item.id}
                            })
                    }
                    var removeList = req.body.RemoveList.split(",");

                    removeList.pop();
                    console.log(removeList);

                    removeList.forEach(function (it, index, array) {
                        db.Audio.findById(it).then(function(audio){
                            console.log(audio);
                            // fs.unlink(fileLocation + audio.audio_location, (err) => {
                            //     if (err) throw err;
                                console.log('successfully deleted');
                            
                        })
                        db.Audio.destroy({
                            where: {
                                id: it
                            }
                        })

                    })

                    itemID = item.id;
                    if(req.files.audioFile != null){
                        req.files.audioFile.forEach(function (it, index, array) {
                            db.Audio.create({
                                item_id: item.id,
                                duration: "3:00",
                                artist: "tempArtist",
                                audio_location: it.filename
                            });
                        });
                    }
                    res.redirect("../../item/" + itemID);
                });
        })
    });

module.exports = router;
