
http = require('http')
var querystring = require('querystring');
//token=H8zroPK4aOADiF46YPzPCS48&team_id=T02A3F3HL&team_domain=poundc&service_id=9547183671&channel_id=C02A97T6Z&channel_name=testing&timestamp=1449629478.000053&user_id=U02A2NEUX&user_name=boltar&text=gis+testing12345&trigger_word=gis
var options = {
	hostname: 'localhost',
	port: 5000,
	path: '/',
	method: 'POST',
  path_str: 'https://hooks.slack.com/services/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',
  host_str: 'poundc.slack.com',
}

date = new Date()

var post_data = [];

post_data[0] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gis 쇼리',
      'trigger_word': 'gis',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });

post_data[1] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gis1 star wars',
      'trigger_word': 'gis1',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });

post_data[2] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gis1 eowks',
      'trigger_word': 'gis1',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });

post_data[3] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gis1 42k Mercedes',
      'trigger_word': 'gis1',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });

post_data[4] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gis1 #imwithher',
      'trigger_word': 'gis1',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });
post_data[5] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gis1 æ',
      'trigger_word': 'gis1',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });
post_data[6] = querystring.stringify({
      'user_id' : 'U02A2NEUX',
      'user_name' : 'boltar',
      'timestamp': '1402359176.000029', //date.getTime(),
      'text' : 'gisstats',
      'trigger_word': 'gis1',
      'channel_name': 'testing',
      'token': '6kV2U9rAZsO7tVaqYumACrTB',
      'team_id': 'T02A3F3HL',
      'team_domain': 'poundc',
      'service_id' : '9547183671',
      'channel_id' : 'C02A97T6Z'
  });
  post_data[7] = querystring.stringify({ // gisg1
    'user_id' : 'U02A2NEUX',
    'user_name' : 'boltar',
    'timestamp': '1402359176.000029', //date.getTime(),
    'text' : 'gisg1 gbbo',
    'trigger_word': 'gisg1',
    'channel_name': 'testing',
    'token': '6kV2U9rAZsO7tVaqYumACrTB',
    'team_id': 'T02A3F3HL',
    'team_domain': 'poundc',
    'service_id' : '9547183671',
    'channel_id' : 'C02A97T6Z'
});
post_data[8] = querystring.stringify({ // gisg <no index>
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gisg gbbo',
  'trigger_word': 'gisg',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});

post_data[9] = querystring.stringify({ // gisg <no index>
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gis1 ellen jue amazon',
  'trigger_word': 'gisg',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});

post_data[10] = querystring.stringify({ // gisg <no index>
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gis1 Anna coronana',
  'trigger_word': 'gisg',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});

//gis1 nixon charleston chew
post_data[11] = querystring.stringify({ // remove memegenerator
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gis1 nixon charleston chew',
  'trigger_word': 'gis1',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});

//gist --> gis then and now
post_data[12] = querystring.stringify({ // then and now
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gist1 iphone',
  'trigger_word': 'gist',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});

post_data[13] = querystring.stringify({ // infographics
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gisi1 iphone',
  'trigger_word': 'gisi',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});

post_data[14] = querystring.stringify({ // test no index (default to index 1, no more random)
  'user_id' : 'U02A2NEUX',
  'user_name' : 'boltar',
  'timestamp': '1402359176.000029', //date.getTime(),
  'text' : 'gisa iphone',
  'trigger_word': 'gis',
  'channel_name': 'testing',
  'token': '6kV2U9rAZsO7tVaqYumACrTB',
  'team_id': 'T02A3F3HL',
  'team_domain': 'poundc',
  'service_id' : '9547183671',
  'channel_id' : 'C02A97T6Z'
});


var req = http.request(options, function(res) {
	//res.setEncoding('utf8')
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk)
	})
})

req.on('error', function (e) {
	console.log('problem with request: ' + e.message)
})

//req.write(post_data[0])

req.write(post_data[14])
req.end()
