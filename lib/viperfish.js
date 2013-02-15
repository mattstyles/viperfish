/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Requires
 */
var express     = require('express'),
    cons        = require('consolidate'),
    http        = require('http'),
    path        = require('path');

/**
 * Create viperfish and expose it via exports
 */
var vp = module.exports = express();


// Configure express server
vp.configure(function(){
    vp.set('port', process.env.PORT || 3000);
    vp.set('views', __dirname + '/../public/templates');
    vp.engine('hjs', cons.hogan);
    vp.set('view engine', 'hjs');
    vp.use(express.favicon());
    vp.use(express.logger('dev'));
    vp.use(express.bodyParser());
    vp.use(express.methodOverride());
    vp.use(vp.router);
    vp.use(express.static(path.join(__dirname, '/../public')));
});

// Configure for development
vp.configure('development', function(){
    vp.use(express.errorHandler());
});

// Configure routes
require( './vp-router' );


