var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');
var shasum = crypto.createHash('sha1');
var authSettings = require('./config').booli;

var auth = {};
auth.callerId = authSettings.callerId;
auth.time = Math.round(Date.now() / 1000);
auth.unique = crypto.randomBytes(Math.ceil(16/2)).toString("hex").slice(0, 16);
auth.hash = shasum.update(auth.callerId + auth.time + authSettings.token + auth.unique).digest("hex");

var query = (cb) => {
	var url = "http://api.booli.se/sold/?q=solna&minRooms=2&maxRooms=2&" + querystring.stringify(auth);

	http.get(url, function (res) {
	  console.log(res.statusCode);
	  var body = "";
	  res.on('data', function(chunk) {
	    body += chunk;
	  });
	  res.on('end', function() {
	    cb(res.statusCode, JSON.parse(body));
	  });
	});
}

module.exports = {
	query: query
}; 