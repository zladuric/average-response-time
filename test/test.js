
var assert = require('assert');
var http = require('http');
var request = require('supertest');
var averageResponseTime = require('..')

describe('averageResponseTime()', function () {

  it('should call the function after `freq=2` requests', function (done) {
    var server = createServer({

      handler: function(time) {
        assert.equal(typeof time, 'number');
        done();
      },
      freq: 2
    });
    request(server)
    .get('/')
    .end(function() {

      request(server)
      .get('/')
      .end(function() {

      });
    });
  });
})

function createServer(opts, fn) {
  var _averageResponseTime = averageResponseTime(opts)
  return http.createServer(function (req, res) {
    _averageResponseTime(req, res, function (err) {
      setTimeout(function () {
        fn && fn(req, res)
        res.statusCode = err ? (err.status || 500) : 200
        res.end(err ? err.message : 'OK')
      }, 10)
    })
  })
}
