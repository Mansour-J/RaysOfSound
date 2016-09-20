var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var express = require('express');
// var app = express();
var app = require('./../../app.js');
// var router = app.Router();

describe('GET view Maori', function() {
  it('load Maori page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/category/2/view')
        .expect(200)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

describe('GET view Samo', function() {
  it('load Samoan page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/category/1/view')
        .expect(200)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

describe('GET view Kuki Airani', function() {
  it('load Kuki Airani page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/category/4/view')
        .expect(200)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

describe('GET view Cook islands', function() {
  it('load cook islands page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/category/3/view')
        .expect(200)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});

describe('GET view false category', function() {
  it('load 404 page', function(done) {
    this.timeout('10000');
    request(app)
        .get('/category/0/view')
        .expect(302)
        .end(function(err, res){   
           if (err) done(err);
           else done();
        });

  });
});