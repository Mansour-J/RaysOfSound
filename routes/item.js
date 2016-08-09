var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id', function(req, res, next) {
	
  res.render('index1'/*TODO replace with item page*/, { title: 'Express' });


});