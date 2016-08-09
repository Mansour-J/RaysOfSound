var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id/view/', function(req, res, next) {
	
  res.render('index1'/*TODO replace with categoy page*/, { title: 'Express' });


});

router.get('/:id/edit/', function(req, res, next) {
	
  res.render('index1'/*TODO replace with categoy page*/, { title: 'Express' });


});

router.put('/:id/edit/', function(req, res, next) {
	
  res.render('index1'/*TODO replace with categoy page*/, { title: 'Express' });


});

router.get('/:id/destroy/', function(req, res, next) {
	
  res.render('index1'/*TODO replace with categoy page*/, { title: 'Express' });


});