var compression = require('compression');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var send = require('send');

var app = express();

app.use(compression());
app.use(morgan('dev'));

app.get(/^[^\.]+$/, function(req, res) {
  send(req, 'index.html', {
    maxAge: 0,
    root: path.join(__dirname, 'public'),
  }).pipe(res);
});

var oneYear = 31536000000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneYear }));

var port = process.env.PORT || 9292;
app.listen(port, function() {
  console.log('Listening on port %d', port);
});
