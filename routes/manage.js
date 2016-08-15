var express = require('express');
var multer = require('multer');
var mime = require('mime-types');
var router = express.Router();

//TODO
//skeleton storage of uploaded files
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads')
    },
    filename: function(req, file, cb) {
      var extesion = "";
      if(mime.extension(file.mimetype) == "mpeg"
        || mime.extesion(file.mimetype) == "mp3" ){
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


var audioFilter = function (req, file, cb) {
    if (mime.extension(file.mimetype) != "mp3" /*&& mime.extension(file.mimetype) != "jpg" */) {
        console.log("Incorrect file format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

var imageFilter = function (req, file, cb) {
    if (mime.extension(file.mimetype) != "jpg" && mime.extension(file.mimetype) != "gif") {
        console.log("Incorrect file format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

router.get('/:id/', function (req, res) {
  res.render(/*TODO replce*/ 'index', {title: "Uploaded"});
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