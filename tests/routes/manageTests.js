var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var requestAgent = require('superagent');
var express = require('express');
// var app = express();
var app = require('./../../app.js');
// var router = app.Router();

var user = requestAgent.agent();


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
//     user
//         .post('/login')
//         .send({username: 'admin', password: 'admin'})
//         .then(user, function(){
//           request(app)
//             .get('/additem')
//             .expect(200)
//             .end(function(err, res){   
//             if (err) done(err);
//               else done();
//             });
//         })
        

//   });
// });