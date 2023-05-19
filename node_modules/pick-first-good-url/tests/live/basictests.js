var test = require('tape');
var pickFirstGoodURL = require('../../index');
var callNextTick = require('call-next-tick');

function isImageMIMEType(response, done) {
  callNextTick(
    done, null, response.headers['content-type'].indexOf('image/') === 0
  );
}

var testCases = [
  {
    opts: {
      urls: [
        'http://dyozopqfp8ikx.cloudfront.net/images/baconaddicts/853/mini/NEW-WRISTBAND-LOVE-THREE-WHITE.JPG%3F1410277943',
        'http://hahacats.com/wp-content/uploads/Corporate-Fatcat-iz-keepin-teh-bonus.jpg',
        'http://www.picgifs.com/graphics/r/rubiks-cube/animaatjes-rubiks-cube-7217468.gif'
      ],
      responseChecker: isImageMIMEType
    },
    expected: {
      url: 'http://www.picgifs.com/graphics/r/rubiks-cube/animaatjes-rubiks-cube-7217468.gif'
    }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Pick test', function basicTest(t) {
    pickFirstGoodURL(testCase.opts, checkResult);

    function checkResult(error, url, response) {
      t.ok(!error, 'No error while picking.');
      t.equal(url, testCase.expected.url, 'Picks correct URL.');
      t.ok(response, 'A response object is passed back.');
      t.end();
    }
  });
}
