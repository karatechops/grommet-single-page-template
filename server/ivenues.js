// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var express = require('express');
var router = express.Router();
var path = require('path');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Router = require('react-router').Router;
var createHistory = require('history').createMemoryHistory;
var createLocation = require('history').createLocation;

var homeRoutes = require('./server-routes.js');

// Convert static resources defined by relative URLs when using HTML5 pushState
function translateStatics(req, res, next) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/$1"));
  } else if (req.url.match(/.+\/video\//)) { // video
    res.redirect(301, req.url.replace(/.*\/(video\/.*)$/, "/$1"));
  } else if (req.url.match(/\/img\//) || req.url.match(/\/video\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/$1"));
  } else {
    next();
  }
}

function processPage(req, res, theme) {

  var path = theme !== '' ? ('/' + theme) : '';

  var locationUrl = '/' + path + req.url.replace(path, '');

  var Component = React.createFactory(Router);

  var location = createLocation(locationUrl);

  var html = ReactDOMServer.renderToString(
    Component({
      routes: homeRoutes('/' + path + '/'),
      history: createHistory({entries: [location]})
    })
  );

  res.render('index.ejs', {
    appBody: html,
    linkTag: "<link id='theme-link' href='/ivenues.min.css' rel='stylesheet' type='text/css'>"
  });

}

function routerProcessor(req, res, next) {
  if (/\..*$/.test(req.url)) {
    translateStatics(req, res, next);
  } else {
    var themeGroups = /docs\/([^\/]+)\/?/.exec(req.originalUrl);

    var theme = '';
    if (themeGroups && themeGroups.length > 1) {
      theme = themeGroups[1];
      var possibleThemes = 'aruba,hpe,hpinc';
      if (possibleThemes.indexOf(theme) === -1) {
        theme = '';
      }
    }
    processPage(req, res, theme);
  }
}
router.use('/', routerProcessor);
router.use('/', express.static(path.join(__dirname, '/../dist')));
router.get('/*', routerProcessor);

module.exports = router;
