var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var app = require('express');
var router = app.Router()

var Category = require("./../../routes/category.js");


//TODO test for specific category id pages
// describe('GET /', function() {
//   it('load category page', function() {

//     request(app)
//         .get('/')
//         .expect(200, "ok")
//         .end(function(err, res){
//            if (err) throw err;
//         });

//   });
// });