var compression = require('compression');
var express = require('express');
var morgan = require('morgan');
var send = require('send');

var app = express();

app.use(compression());
app.use(morgan('dev'));

app.get(/^[^\.]+$/, function(req, res) {
  send(req, 'index.html', {
    maxAge: 0,
    root: __dirname + '/public',
  }).pipe(res);
});

app.use(express.static(__dirname + '/public', {maxAge: 31536000000 }));

var port = process.env.PORT || 9292;
app.listen(port, function() {
  console.log('Listening on port %d', port);
});
