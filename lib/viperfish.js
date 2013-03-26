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
    http        = require('http');

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

    // Configure express server - more config happens in init()
    vpf.configure(function(){
        vpf.use(express.logger('dev'));
        vpf.use(express.bodyParser());
        vpf.use(express.methodOverride());
    });

    // Configure for development
    vpf.configure('development', function(){
        vpf.use(express.errorHandler());
    });

    // Init viperfish - must require vpf-init and then call init()
    require( './vpf-init' );
    vpf.init.init();

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


