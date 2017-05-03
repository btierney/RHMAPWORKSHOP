var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function getodaysdateRoute() {
  var getodaysdate = new express.Router();
  getodaysdate.use(cors());
  getodaysdate.use(bodyParser());

  getodaysdate.post('/', function(req, res) {
      
    console.log('In getodaysdateRoute route POST');

    var d = new Date().toLocaleDateString();

    res.json({today: d});
  });

  return getodaysdate;
}

module.exports = getodaysdateRoute;
