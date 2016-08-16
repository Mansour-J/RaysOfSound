var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var request = require('supertest');
var app = require('express');
var router = app.Router()

var Manage = require("./../../routes/manage.js");

describe('GET /manage', function() {
  it('load manage page', function() {

    request(app)
        .get('/manage')
        .expect(200, "ok")
        .end(function(err, res){
           if (err) throw err;
        });

  });
});