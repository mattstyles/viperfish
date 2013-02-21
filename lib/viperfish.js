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
var vpf = module.exports = express();

/**
 * Start
 * --
 * Configures the server and then starts it
 */
vpf.start = function() {
    // Configure express server
    vpf.configure(function(){
        vpf.set('port', process.env.PORT || 3000);
        vpf.set('views', __dirname + '/../public/templates');
        vpf.engine('hjs', cons.hogan);
        vpf.set('view engine', 'hjs');
        vpf.use(express.favicon());
        vpf.use(express.logger('dev'));
        vpf.use(express.bodyParser());
        vpf.use(express.methodOverride());
        vpf.use(express.static(path.join(__dirname, '/../public')));
        vpf.use(vpf.router);
    });

    // Configure for development
    vpf.configure('development', function(){
        vpf.use(express.errorHandler());
    });

    // Apply dependencies
    vpf.dependencies();

    // Start the server
    vpf.startServer();
};

/**
 * Start the server
 */
vpf.startServer = function() {
    // Create the server and start listening
    http.createServer(vpf).listen(vpf.get('port'), function(){
        console.log("Express server listening on port " + vpf.get('port'));
    });
};

/**
 * Add dependencies
 */
vpf.dependencies = function() {
    // Add the config to viperfish
    require( './vpf-config' );

    // Add utils to viperfish
    require( './vpf-utils' );

    // Add core functionality to viperfish
    require( './vpf-core' );

    // Configure routes for viperfish
    require( './vpf-router' );

    // Call any functions to initialise the dependencies
    vpf.core.getNav();
};