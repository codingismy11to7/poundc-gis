pick-first-good-url
===================

Passes back the first good URL in the list, where good means:
- The responds with status code 200 and
- The response fulfills the optional user criteria.

Installation
------------

    npm install pick-first-good-url

Usage
-----

    var pickFirstGoodURL = require('pick-first-good-url');
    var callNextTick = require('call-next-tick');

    function isImageMIMEType(response, done) {
      callNextTick(
        done, null, response.headers['content-type'].indexOf('image/') === 0
      );
    }

    var opts = {
      urls: [
        'http://dyozopqfp8ikx.cloudfront.net/images/baconaddicts/853/mini/NEW-WRISTBAND-LOVE-THREE-WHITE.JPG%3F1410277943',
        'http://hahacats.com/wp-content/uploads/Corporate-Fatcat-iz-keepin-teh-bonus.jpg',
        'http://www.picgifs.com/graphics/r/rubiks-cube/animaatjes-rubiks-cube-7217468.gif'
      ],
      responseChecker: isImageMIMEType
    };

    pickFirstGoodURL(opts, logResult);

    function logResult(error, url, response) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(url);
      }
    }

Output:
  
    http://www.picgifs.com/graphics/r/rubiks-cube/animaatjes-rubiks-cube-7217468.gif

Tests
-----

Run tests with `make test`. Warning: These are live tests that actually make requests on the Internet.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
