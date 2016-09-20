var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var express = require('express');
// var app = express();
var app = require('./../../app.js');
// var router = app.Router();

var Index = require("./../../routes/index.js");
request(app).get('/');

describe('GET /', function() {
  it('load index page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/')
        .expect(200)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

describe('GET /contactus', function() {
  it('load contact us page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/contactus')
        .expect(200)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

describe('GET /404', function() {
  it('load 404 page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/GypsyMcFunkPants')
        .expect(404)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

