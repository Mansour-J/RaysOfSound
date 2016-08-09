var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var app = require('express');
var router = app.Router()

var Item = require("./../../routes/item.js");


//TODO test for specific item pages
// describe('GET /', function() {
//   it('load item page', function() {

//     request(app)
//         .get('/')
//         .expect(200, "ok")
//         .end(function(err, res){
//            if (err) throw err;
//         });

//   });
// });