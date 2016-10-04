var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var express = require('express');
// var app = express();
var app = require('./../../app.js');
// var router = app.Router();

// describe('GET view item 1', function() {
//   it('load item 1 page', function(done) {
//     this.timeout('10000');
//     request(app)
//         .get('/item/1')
//         .expect(200)
//         .end(function(err, res){   
//            if (err) done(err);
//            else done();
//         });

//   });
// });

describe('GET invalid view item 0', function() {
  it('load item 0 page, error', function(done) {
    this.timeout('10000');
    request(app)
        .get('/item/0')
        .expect(500)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });
 
  });
});