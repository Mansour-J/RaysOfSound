var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var express = require('express');
// var app = express();
var app = require('./../../app.js');
// var router = app.Router();


describe('GET additem page', function() {
  it('load add item page, logged out', function(done) {
    this.timeout('10000');
    request(app)
        .get('/additem')
        .expect(302)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

// describe('GET additem page', function() {
  
//   it('load add item page, logged in', function(done) {
//     this.timeout('10000');
//     request(app)
//         .post('/login')
//         .field('username' , 'admin')
//         .field('pasword' , 'admin')
//         request(app)
//         .get('/additem')
//         .expect(200)
//         .end(function(err, res){   
//            if (err) done(err);
//            else done();
//         });

//   });
// });