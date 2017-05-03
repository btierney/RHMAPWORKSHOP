var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require ('request');



function weatherRoute() {
  var weather = new express.Router();
  weather.use(cors());
  weather.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  weather.get('/', function(req, res) {
    console.log(new Date(), 'In weatheradjusted route GET / req.query=', req.query);
    var forcast = req.query && req.query.city ? req.query.city : 'Chicago';
    request('http://api.openweathermap.org/data/2.5/weather?appid=00fd6350d7b03123c324839586cb50ad&q=' + forcast, 
      function (error, response, body) {
        var convertedTemps = {};

        if (!error && response.statusCode == 200) {
          jsonBody = JSON.parse(body);
          console.log('in return');
          convertedTemps.city = forcast;
          convertedTemps.currTemp = convertToFarenheit(jsonBody.main.temp);
          convertedTemps.highTemp = convertToFarenheit(jsonBody.main.temp_max);
          convertedTemps.lowTemp  = convertToFarenheit(jsonBody.main.temp_min);
          convertedTemps.humidity = jsonBody.main.humidity;

          console.log(convertedTemps);
  
        }
        
        res.json(convertedTemps);
      });
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  weather.post('/', function(req, res) {
    console.log(new Date(), 'In weatheradjusted route POST / req.body=', req.body);
    var forcast = req.body && req.body.city ? req.body.city : 'Chicago';
    request('http://api.openweathermap.org/data/2.5/weather?appid=00fd6350d7b03123c324839586cb50ad&q=' + forcast, 
      function (error, response, body) {
        var convertedTemps = {};
        
        if (!error && response.statusCode == 200) {
          jsonBody = JSON.parse(body);
          
          convertedTemps.city = forcast;
          convertedTemps.currTemp = convertToFarenheit(jsonBody.main.temp);
          convertedTemps.highTemp = convertToFarenheit(jsonBody.main.temp_max);
          convertedTemps.lowTemp  = convertToFarenheit(jsonBody.main.temp_min);
          convertedTemps.humidity = jsonBody.main.humidity;

          console.log(convertedTemps);
        }
        
        res.json(convertedTemps);
      });
  });
  
  // Convert to Farenheit
  function convertToFarenheit(kelvin) {
    return (1.8 * (kelvin - 273) + 32).toFixed(2);
  }
  
  return weather;
}

module.exports = weatherRoute;
