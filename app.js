
/**
 * Module dependencies.
 */

var express     = require('express'),
    viperfish   = require('./lib/viperfish'),
    http        = require('http'),
    path        = require('path');

var app = express();

// Configure express server
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/public/templates');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// Configure for development
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Configure routes
app.get('/', viperfish.index);

// Create the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
