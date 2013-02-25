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
        vpf.set('port', process.env.PORT || require('./vpf-config').moduleOpts.port );
        vpf.set('views', __dirname + '/../public/templates');                                   // Default templates
        vpf.engine('hjs', cons.hogan);
        vpf.set('view engine', 'hjs');
//        vpf.use(express.favicon(process.cwd() + '/public/favicon.ico', { maxAge: 2592000000 }));    // Custom favicon
        vpf.use(express.favicon(__dirname + '/../public/favicon.ico', { maxAge: 2592000000 }));    // Default Viperfish favicon
        vpf.use(express.favicon());                                                             // Default express favicon as fallback
        vpf.use(express.logger('dev'));
        vpf.use(express.bodyParser());
        vpf.use(express.methodOverride());
        vpf.use(express.static(path.join(process.cwd(), '/public')));                           // Custom /public
        vpf.use(express.static(path.join(__dirname, '/../public')));                            // Default /public
        vpf.use(vpf.router);
    });

    // Configure for development
    vpf.configure('development', function(){
        vpf.use(express.errorHandler());
    });

    // Apply dependencies
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

    // Configure routes for viperfish
    require( './vpf-router' );

    /* -----------------------------------------------------------------------
     *
     *     Call functions to init viperfish -- order is important
     *
     * ----------------------------------------------------------------------- */

     // Authorise with github
    vpf.core.authGithub();

    // Get nav data and store it in the config
    vpf.core.getNav();

    // Set the view path
    vpf.core.setViewPath();
};