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
    path        = require('path'),
    fs          = require('fs');

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

    // Init viperfish
    vpf.init();

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
 *  General initialisation
 */
vpf.init = function() {
    /* -----------------------------------------------------------------------
     *
     *     Require dependencies
     *
     * ----------------------------------------------------------------------- */

     // Add the config to viperfish
    require( './vpf-config' );

    // Add utils to viperfish
    require( './vpf-utils' );

    // Add core functionality to viperfish
    require( './vpf-core' );


    /* -----------------------------------------------------------------------
     *
     *     Call functions to init viperfish -- order is important
     *
     * ----------------------------------------------------------------------- */

     // Authorise with github
    vpf.core.authGithub();

    // Set the config first
    vpf.setConfig( 'config.js' );

    // Get nav data and store it in the config
    vpf.core.getNav();

    // Set the templates - custom if they exist or default
    vpf.setTemplates();

    // Set up the port number - only used if not specified by process
    vpf.setPort( vpf.config.moduleOpts.port );

    // Set up static serving
    vpf.setStatic( vpf.config.moduleOpts.customPath );

    // Set up favicon
    vpf.setFavicon( vpf.config.moduleOpts.favicon );

    // Configure routes for viperfish after configuring static serving
    require( './vpf-router' );
};

