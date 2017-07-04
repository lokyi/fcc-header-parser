// server.js

// init project
var express = require('express');
var useragent = require('useragent');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function (request, response) {
  var language = request.headers['accept-language'] ? request.headers['accept-language'].split(',')[0] : null;

  var agent = useragent.parse(request.headers['user-agent']) || null;
  var os = agent.os || null;
  var software = os ? os.family : null;
  if (os && os.major) software += ' ' + agent.os.major;
  if (os && os.minor) software += '.' + agent.os.minor;
  if (os && os.patch) software += '.' + agent.os.patch;

  response.json({
    ipaddress: request.ip || null,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Timestamp microservice is listening on port ' + listener.address().port);
});
