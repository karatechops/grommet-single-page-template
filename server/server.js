// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var compression = require('compression');
var express = require('express');
var http = require("http");
var router = express.Router({strict: true});
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var throng = require('throng');

var ivenues = require('./ivenues');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 8000;

throng(WORKERS, start);

function start() {
  var app = express();

  app.set('views', path.resolve(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(compression());

  app.use(cookieParser());

  if (!process.env.SILENT_MODE) {
    app.use(morgan('tiny'));
  }

  router.use('/', ivenues);

  app.use('/', function(req, res, next) {
    var acceptLanguageHeader = req.headers['accept-language'];

    if (acceptLanguageHeader) {
      var acceptedLanguages = acceptLanguageHeader.match(/[a-zA-z\-]{2,10}/g);
      if (acceptedLanguages) {
        res.cookie('languages', JSON.stringify(acceptedLanguages));
      }
    }

    next();
  });

  // The robots.txt file must be at the root of the webserver
  // in order for bots to find locate it.  Without this function,
  // the file is hosted under the /ivenues directory.
  app.get('/robots.txt', function(req, res) {
    var options = {
      root: path.join(__dirname, '/../dist'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    res.sendFile('robots.txt', options);
  });

  app.
    use('', router).
    use('/assets', express.static(path.join(__dirname, '/../dist/assets')));

  var server = http.createServer(app);

  server.listen(PORT);

  console.log('Server started, listening at: http://localhost:' + PORT + '...');
}
