# average-response-time

Quick-and-dirty avereage-response-time handler. I've based it on [Response time]
(https://www.npmjs.com/package/response-time).

This module creates a middleware that holds the last x response times for
requests in HTTP servers, and calculates the average reponse time.

Disclaimer: it's very simple, trivial, keeps things in memory, and does not
verify all the parameters. It is not tested (yet), so use at your own risk.

## Installation

```sh
$ npm install average-response-time
```

## API


### averageResponseTime(options)

Create a middleware that takes up to three parameters parameter, `handler`,
`count` and `freq`.

#### Options

The options object holds mndaatory `handler` and optional `count` and `freq`
params.

##### handle

Handler is a simple function called every `freq` requests with `averageTime`.
The average is a simple aritmetic mean of the last `count` requests.


##### count

`count` param (default `1000`) is an int of how many last request times to keep.

##### freq

How frequently should the average be calculated and `handler` called. Default is
`500`.

## Examples

### express/connect

```js
let express = require('express');
let averageResponseTime = require('average-response-time');

let app = express();

app.use(averageResponseTime({

  count: 10000,
  freq: 1000,
  handler: function(time) {

    console.log('Average response time for the last 10000 requests: ', time);
  }
}));

app.get('/', function (req, res) {
  res.send('hello, world!');
})
```

## TODO

- add tests for everything
- verify params


## License

[MIT](LICENSE)
