var async = require('async');
var request = require('request');

function pickFirstGoodURL(opts, pickingDone) {
  var URLs;
  var responseChecker;

  if (opts) {
    urls = opts.urls;
    responseChecker = opts.responseChecker;    
  }

  var goodURL;
  var goodResponse;

  async.some(urls, urlRespondsWithGoodStatusCode, passBackGoodURL);

  function urlRespondsWithGoodStatusCode(url, done) {
    var requestOpts = {
      url: url,
      encoding: null
    };
    request(requestOpts, checkResponse);

    function checkResponse(error, response) {
      if (error || response.statusCode !== 200) {
        done(false);
      }
      else if (responseChecker) {
        responseChecker(response, translateCheckerResult);
      }
      else {
        goodURL = url;
        goodResponse = response;
        done(true);
      }

      function translateCheckerResult(error, result) {
        if (!error && result) {
          goodURL = url;
          goodResponse = response;
          done(true);
        }
        else {
          done(false);
        }
      }
    }
  }

  function passBackGoodURL() {
    pickingDone(null, goodURL, goodResponse);
  }
}

module.exports = pickFirstGoodURL;
