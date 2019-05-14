
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";

exports.getWeather = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&zip=' + zip + ',nz';

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' F';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);

/*
exports.getWeather2 = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) age: 1.0
Preparing the build artifacts...
Running "mochaTest:fvt" (mochaTest) task
{
  "stats": {
    "suites": 1,
    "tests": 3,
    "passes": 1,
    "pending": 0,
    "failures": 2,
    "start": "2019-05-13T23:31:09.794Z",
    "end": "2019-05-13T23:31:10.247Z",
    "duration": 453
  },
  "tests": [
    {
      "title": "with valid city name",
      "fullTitle": "Get Weather with valid city name",
      "currentRetry": 0,
      "err": {
        "message": "expected 400 to equal 200",
        "showDiff": false,
        "actual": 400,
        "expected": 200,
        "stack": "AssertionError: expected 400 to equal 200\n  at Request._callback (tests/fvt/api.specs.js:30:22)\n  at Request.self.callback (node_modules/request/request.js:185:22)\n  at Request.<anonymous> (node_modules/request/request.js:1161:10)\n  at IncomingMessage.<anonymous> (node_modules/request/request.js:1083:12)\n  at endReadableNT (_stream_readable.js:974:12)\n  at _combinedTickCallback (internal/process/next_tick.js:74:11)\n  at process._tickDomainCallback (internal/process/next_tick.js:122:9)\n",
        "domain": {
          "domain": null,
          "_events": {},
          "_eventsCount": 1,
          "members": []
        },
        "domainThrown": true,
        "uncaught": true
      }
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&zip=' + zip + ',us';

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' F';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather2', exports.getWeather2);
*/

exports.router = router;
