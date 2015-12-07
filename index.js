/*!
 * response-time
 */

/**
 * Module dependencies
 * @api private
 */

var onHeaders = require('on-headers');
var FixedQueue = require('fixedqueue').FixedQueue;

/**
 * Module exports
 */

module.exports = averageResponseTime;

/**
 * Reponse time:
 *
 * Adds the `X-Response-Time` header displaying the response
 * duration in milliseconds.
 *
 * @param {object} options
 * @param {function} options.handler Handler to be called every `freq` requests.
 * @param {number} [options.count=1000] Count of request times to keep
 * @param {number} [options.freq=500] Frequency of calling the handler
 * @return {function}
 * @api public
 */

function averageResponseTime(options) {

  var opts = options || {};

  var handler = options.handler;
  if (typeof handler !== 'function') {

    throw new Error('`handler` function is a mandatory parameter.');
  }
  var count = options.count || 1000;
  var freq = options.freq || 500;
  var queue = new FixedQueue(count);
  var it = 0;

  return function averageResponseTime(req, res, next) {
    var startAt = process.hrtime()

    onHeaders(res, function onHeaders() {

      var diff = process.hrtime(startAt)
      var time = Math.round(diff[0] * 1e3 + diff[1] * 1e-6);
      queue.push(time);
      it++;
      if (it === freq) {

        it = 0;
        var average = Math.round(queue.reduce(function(tot, cur) { return tot + cur; }, 0) / queue.length);
        handler(average);
      }
    });

    next();
  }
}
