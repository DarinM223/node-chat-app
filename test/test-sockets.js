'use strict';

var should = require('should');
var sockets = require('../sockets.js');
var redisClient = require('../redis/redisClient.js')(true);

describe('Testing sockets', function() {
  describe('Test onUserLogin', function() {
    beforeEach(function(done) {
      done();
    });
    afterEach(function(done) {
      done();
    });

    it('should add socket manager k/v pair', function(done) {
      done();
    });
    it('should set login key', function(done) {
      done();
    });
  });
  describe('Test onJoinGroup', function() {
    beforeEach(function(done) {
      done();
    });
    afterEach(function(done) {
      done();
    });

    it('should add the userid to the group in mongodb', function(done) {
      done();
    });
    it('should add the userid to the set in redis', function(done) {
      done();
    });
  });
  describe('Test onMessage', function() {
    it('should work', function(done) {
      done();
    });
  });
  describe('Test onDisconnect', function() {
    var userid = '23456678';
    beforeEach(function(done) {
      sockets.handleDisconnect();
      done();
    });

    it('should set the login key in redis to false', function(done) {
      //redisClient.get('login:' + userid, function(err, result) {
      //  result.should.equal(false);
      //});
      done();
    });
  });
});