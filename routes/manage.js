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
      if(mime.extension(file.mimetype) == "mpeg"){
        extension = "mp3"
      }
      cb(null, Date.now() + '.' + extension);
    }
});


var fileFilter = function (req, file, cb) {
    if (mime.extension(file.mimetype) != "mp3" /*&& mime.extension(file.mimetype) != "jpg" */) {
        console.log("Incorrect file format");
        cb(null, false);
    }
    else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
};

router.get('/', function (req, res) {
  res.render(/*TODO replce*/ 'index', {title: "Uploaded"});
});

module.exports = router;
