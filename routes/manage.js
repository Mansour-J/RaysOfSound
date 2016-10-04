var express = require('express');
var multer = require('multer');
var mime = require('mime-types');
var db = require('../lib/db');
var router = express.Router();
var helper = require('../lib/helper');


var images = [];
var audio = [];

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

//filter out unsupported audio formats
var audioFilter = function (req, file, cb) {
    if (mime.extension(file.mimetype) != "mp3" /*&& mime.extension(file.mimetype) != "jpg" */) {
        console.log("Invalid audio format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

//filter out unsupported image formats
var imageFilter = function (req, file, cb) {
    if (mime.extension(file.mimetype) != "jpg" && mime.extension(file.mimetype) != "png") {
        console.log("Invalid image format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

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
                // console.log(req.files);
                // console.log(req.files.audioFile[0].filename);
                req.files.audioFile.forEach(function (it, index, array){
                    db.Audio.create({
                        item_id: item.id,
                        duration: "3:00",
                        artist: "tempArtist",
                        audio_location: it.filename
                    });
                });

            }).then(function(results){
                res.redirect("../item/" + itemID);
            });
        });
    });

router.get('/:id/destroy/', function (req, res) {
    res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
});


router.post('/addAudio/:id', multer({storage: storage, fileFilter: fileFilter}).fields([{
        name: 'audioFile', maxCount: 1
    }]),
    function (req, res) {
        console.log("WE GOT HERE");
        console.log(req.params.id);
        console.log("SSSS" + req.files);
        db.Audio.create({
            item_id: req.params.id,
            duration: "3:00",
            artist: "tempArtist",
            audio_location: "some shit"
            // audio_location: req.body.ItemAudio
        });
        console.log("WE GOT HERE ASWELL");
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
                        image: req.body.ItemImage,
                        metadata: req.body.ItemData
                    },
                    {
                        where: {id: item.id}
                    })
            }).then(function () {
            db.Item.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function () {
                res.redirect('../../item/' + req.params.id);
            });
        });
    });
});

module.exports = router;
