var config = require('./config');
var http = require('http');
var qs = require('qs');
var gis = require('g-i-s');
var probable = require('probable');
var pickFirstGoodURL = require('pick-first-good-url');
var callNextTick = require('call-next-tick');
var compact = require('lodash.compact');

//override webhookPort for heroku

config.webhookPort = Number(process.env.PORT || 8080)

console.log('The slack-gis webhook server is running.');
var total_searches = 0;
var total_failures = 0;

function takeRequest(req, res) {
  console.log("request received!");
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end('OK');
  }
  else if (req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function doneReadingData() {
      console.log("POST received. Body: " + body);
      respondToRequestWithBody(req, body, res, headers);
    });
  }
  else {
    res.writeHead(304, headers);
    res.end();
  }
}

async function respondToRequestWithBody(req, body, res, headers) {
  headers['Content-Type'] = 'text/json';

  var params = qs.parse(body);
  var repeat_count = 0;
  console.log("params.token: " + params.token)

  if (config.validWebhookTokens.indexOf(params.token) === -1) {
    res.writeHead(404);
    res.end();
  }
  else if (params.user_name === 'slackbot') {
    // Don't respond to self; avoid infinite loops.
    res.writeHead(200);
    res.end();
  }
  else if (typeof params.text === 'string') {
    // Remove internal Slack user id references.
    console.log("chan text: '" + params.text + "'");

    var response = {
      username: 'google-image-search',
      channel: params.channel_id
    };

    if (params.text == 'gisstats')
    {
      genericResponse(null, 'total searches: ' + total_searches + ", total failures: " + total_failures);
      return;
    }
    parsed = getSearchTextAndIndex(params.text);

    //parsed.text = parsed.text.replace("#","%23")

    console.log("calling with search text: '" + parsed.text + "'")
    total_searches++;
    const result = await gis(parsed.text);
    //console.log(result[1].url)
    respondWithImages(result)
  }

  function respondWithImages(images) {
    console.log("respondWithImages:")
    var imageURLs;
    
    // remove fbsbx.com entries (among others)
    var fbsbx = /(fbsbx\.com)|(memegenerator\.net)(gstatic.com)/i
    //console.log("resopnded with results: '" + images + "'")

    images = images.filter(img => !fbsbx.exec(img.url))

    if (parsed.index > 0) {
      //don't normalize on the 1-based index -- the first result is garbage
      if (images[parsed.index]) {
        repeat_count = 0;
        writeImageToResponse(null, images[parsed.index])
      } else if (repeat_count < 5){
        // we have the shrug!
        repeat_count++;
        total_failures++;
        console.log("we have " + repeat_count + " fail(s)");
        gis(parsed.text, respondWithImages);
      } else {
        // too many shrugs
        repeat_count = 0;
        console.log("too many failures");
        writeImageToResponse(null, null)
      }
    }
    else
    {
      if (probable.roll(2) === 0) {
        imageURLs = probable.shuffle(images);
      }
      else {
        imageURLs = probable.shuffle(images.slice(0, 10));
      }

      var pickOpts = {
        urls: imageURLs.map(a => a.url),
        responseChecker: isImageMIMEType
      };
      pickFirstGoodURL(pickOpts, writeImageToResponse);
    }
  }

  function genericResponse(error, text) {
    console.log("returning generic text: '" + text + "'")
    res.writeHead(200, headers);
    response.text = text // replace all %25 to %
    res.end(JSON.stringify(response));

  }

  function writeImageToResponse(error, imageURL) {

    if (imageURL) {
      response.text = imageURL;
    } else {
      response.text = '¯\\_(ツ)_/¯';
    }
    console.log("returning text: '" + response.text.url + "'")

    res.writeHead(200, headers);
    // if we're using the pickFirstGoodURL, we've passed in an array of pure urls, for others, we're using an array of objects which has a
    // .url property. this is messy -- should think about disabling non-indexed calls for maintainability

    if ("undefined" === typeof(response.text.url)) {
      response.text = response.text.replace(/%25/g, "%") // replace all %25 to %
      response.text = response.text.replace(/\\u003d/g, "=")  // replace all \u003d to =
      response.text = response.text.replace(/\\u0026/g, "&")  // replace all \u0026 to &
    } else {
      response.text = response.text.url.replace(/%25/g, "%") // replace all %25 to %
      response.text = response.text.replace(/\\u003d/g, "=")  // replace all \u003d to =
      response.text = response.text.replace(/\\u0026/g, "&")  // replace all \u0026 to &
    }

    res.end(JSON.stringify(response));
  }
}

function defined(value) {
  return value !== undefined;
}

function isImageMIMEType(response, done) {
  callNextTick(
    done, null, response.headers['content-type'].indexOf('image/') === 0
  );
}


const randomWord = require('random-word');

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function hehehe(str)
{


  var modifiers = [" girls", " -girls", " three girls", " boobs", " butt", " bob sagat"]

  var x = randomInt(0,modifiers.length + 1);
  console.log(x)
  var modStr = ''
  if (x == modifiers.length)
  {
    modStr += " " + randomWord();
  }
  else {
    modStr = modifiers[randomInt(0,modifiers.length)];
  }

  console.log(modStr);
  return str + modStr;
}

function getSearchTextAndIndex(messageText) {

  var gisTrigger = /^gis[gtiam]?[\d+]*/i
  var imageIndex = 0;
  match = gisTrigger.exec(messageText);
  // match is guaranteed to succeed, because trigger is 'gis'
  matchIndex = /[\d]+/.exec(match) //do we have an index?
  isGisG = /^gisg/i.exec(match) // do we have a gisg?
  isGisT = /^gist/i.exec(match) // do we have a gist?
  isGisI = /^gisi/i.exec(match) // do we have a gisi?
  isGisA = /^gisa/i.exec(match) // do we have a gisa?
  isGisM = /^gism/i.exec(match) // do we have a gisa?
  if (matchIndex != null)
  {
    // we have a valid index
    imageIndex = match[0].replace(/^gis[gtiam]?/i, '')
    messageText = messageText.replace(gisTrigger, '')
    messageText = messageText.substr(1)
    var test = 0;
    if (test)
    {
      messageText = hehehe(messageText)
    }
    console.log("valid index: " + imageIndex)
  }
  else
  {
    // no index! default to 1
    console.log("no index, defaulting to index of 1")
    imageIndex = 1
    messageText = messageText.replace(/^gis[gtiam]?/i, '')
  }

  if (messageText.charAt(0) === ' ')
  {
    messageText = messageText.substr(1);
  }

  if (isGisG) {
    messageText += " girls"
  } else if (isGisT) {
    messageText += " then and now"
  } else if (isGisI) {
    messageText += " infographics"
  } else if (isGisA) {
    messageText += " animated gif"
  } else if (isGisM) {
    messageText += " meme"
  }

  return {text: messageText, index: imageIndex};
}

http.createServer(takeRequest).listen(config.webhookPort);

console.log('Webhook server listening at port:', config.webhookPort);
