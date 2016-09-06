var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var app = require('express');
var router = app.Router()

var Index = require("./../../routes/index.js");

//TODO 
//WHY WONT THIS FAIL??????? ARGH!!!!
describe('GET /', function() {
  it('load index page', function() {

    request(app)
        .get('/fred')
        .expect(404)
        .expect(function(res){
          if(true) return 'this should fail'
        })
        .end(function(err, res){
          if(err)
            done.fail(err);
          else
            done(err);
          // if (err) throw err;
        });

  });
});

describe('GET /contactus', function() {
  it('load index page', function() {

    request(app)
        .get('/contactus')
        .expect(200, "ok")
        .end(function(err, res){
           if (err) throw err;
        });

  });
});

describe('GET /maori', function() {
  it('load index page', function() {

    request(app)
        .get('/maori')
        .expect(200, "ok")
        .end(function(err, res){
           if (err) throw err;
        });

  });
});

describe('GET /404', function() {
  it('load index page', function() {

    request(app)
        .get('/GypsyMcFunkPants')
        .expect(404)
        .end(function(err, res){
           res.should.have.status(404);      
           if (err) throw err;
           done();
        });

  });
});
