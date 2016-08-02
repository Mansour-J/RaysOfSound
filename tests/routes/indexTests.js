var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var app = require('express');
var router = app.Router()

var Index = require("./../../routes/index.js");

describe('GET /', function() {
  it('load index page', function() {

    request(app)
        .get('/')
        .expect(200, "ok")
        .end(function(err, res){
           if (err) throw err;
        });

  });
});
