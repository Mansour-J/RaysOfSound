var express = require('express');
var multer = require('multer');
var mime = require('mime-types');
var db = require('../lib/db');
var router = express.Router();

//TODO
//DEPRECATED former file filter
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    fileFilter: function(req, file, cb){
      console.log(file);
      if(file.mimetype == "image/*"){
        imageFilter;
      }
      else if(file.mimetype == "audio/*"){
        audioFilter;
      }
      else{
        cb(null, false);
      }
    },
    filename: function(req, file, cb) {
      var extension = "";
      if(mime.extension(file.mimetype) == "mpeg"
        || mime.extension(file.mimetype) == "mp3" ){
        extension = "mp3";
      }
      else if(mime.extension(file.mimetype) == "mp4"){
        extension = "m4a";
      }
      else if(mime.extension(file.mimetype) == "jpeg"){
        extension = "jpg";
      }
      cb(null, Date.now() + '.' + extension);
    }
});

//filter out unsupported audio formats
var audioStorage = multer.diskStorage({
    // console.log("setting up audio storage");
    destination: function(req, file, cb) {
      cb(null, './files/audio');
    },
    fileFilter: audioFilter,
    filename: function(req, file, cb) {
      var extension = "";
      if(mime.extension(file.mimetype) == "mpeg"
        || mime.extension(file.mimetype) == "mp3" ){
        extension = "mp3";
      }
      else if(mime.extension(file.mimetype) == "mp4"){
        extension = "m4a";
      }
      cb(null, Date.now() + '.' + extension);
    }
});

//filter out unsupported image formats
var imageStorage = multer.diskStorage({
  // console.log("setting up image storage");
    destination: function(req, file, cb) {
      cb(null, './files/images');
    },
    // fileFilter: imageFilter,
    filename: function(req, file, cb) {
      var extension = "";
      if(mime.extension(file.mimetype) == "jpeg"){
        extension = "jpg";
      }
      cb(null, Date.now() + '.' + extension);
    }
});


var audioFilter = function (req, file, cb) {
  console.log("audio filtering");
    if (mime.extension(file.mimetype) != "mp3" /*&& mime.extension(file.mimetype) != "jpg" */) {
        console.log("Incorrect audio format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

var imageFilter = function (req, file, cb) {
  console.log("image filtering");
    if (mime.extension(file.mimetype) != "jpg" && mime.extension(file.mimetype) != "gif") {
        console.log("Incorrect image format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

// router.get('/:id/', function (req, res) {
//   res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
// });



router.get('/createItem/', function (req, res) {
  db.Category.findAll().then(function(categories){
  res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded", data: categories});
})
});

//TEST CODE>>>REMOVE
// router.post('/TESTFILE/', multer({storage: audioStorage}).array('audio', 10), 
//     multer({storage: imageStorage}).array('image', 5), function (req, res) {
//       console.log("im here");
//       console.log(req);
//       // console.log(req.files);

//       // console.log(req.files[0]);

//   res.redirect('/');
// });
router.post('/TESTFILE/', multer({storage: imageStorage}).fields([{
    name: 'audioFile', maxCount: 10
  }, {
    name: 'imageFile', maxCount: 1
  }]),
    function (req, res) {
      console.log("im here");
      console.log(req);
      // console.log(req.files);

      // console.log(req.files[0]);

  res.redirect('/');
});




router.post('/createItem/', function (req, res) {
  var id;
  console.log(req.body);

  db.Item.create({
    category_id: req.body.category,
    item_name: req.body.name,
    description: req.body.description,
    // user_id:

  }).then(function (item) {
    res.redirect(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
  })
  // res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
});



router.get('/:id/edit/', function (req, res) {
  var loggedIn;

  db.Item.findAll({
    where: {
      id: req.params.id
    }
  }).then(function (items){
    db.Category.findAll().then(function(categories){
      res.render('Item.ejs', {
        title: "Uploaded", 
        data: categories
      });
    });
  });
  // res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
});



router.post('/:id/edit/', function (req, res) {
  res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
});



router.get('/:id/destroy/', function (req, res) {
  res.render(/*TODO replce*/ 'index.ejs', {title: "Uploaded"});
});



router.post('/SubmitAudio', multer({storage: storage}).single('upl'), function(req, res) {
  var audio_id;
  console.log(req.body);
  console.log(req.file);
  /*TODO

  */
  res.redirect("/");
});
/*
function Manage () {}
Manage.getTest = function() {
  return 0;
};
*/

module.exports = router;
