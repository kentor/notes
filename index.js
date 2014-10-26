var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

var port = process.env.PORT || 9292;
app.listen(port, function() {
  console.log('Listening on port %d', port);
});
