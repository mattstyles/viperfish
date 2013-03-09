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
    _           = require('underscore'),
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
    vpf.setTemplates( vpf.config.tmplOpts.engine );

    // Set up the port number - only used if not specified by process
    vpf.setPort( vpf.config.moduleOpts.port );

    // Set up static serving
    vpf.setStatic( vpf.config.moduleOpts.customPath );

    // Set up favicon
    vpf.setFavicon( vpf.config.moduleOpts.favicon );

    // Configure routes for viperfish after configuring static serving
    require( './vpf-router' );
};

/**
 * Sets up the view engine and templates
 * @param tmpl - the view engine to use - currently only hogan is supported
 */
vpf.setTemplates = function( tmpl ) {
    var cwd = path.join(process.cwd(), vpf.config.moduleOpts.customPath, 'templates' );

    vpf.configure(function() {
        // Check for a public templates folder
        // @todo should check also for the specified theme but for now just check for a custom public templates folder
        try {
            fs.readdirSync( cwd );

            // If there was no error with reading the directory then it must exist so use it to get the templates
            console.log( 'Custom template directory found' );
            vpf.set( 'views',cwd );
        }
        catch (err) {
            // If an error occurred then use the default templates
            console.log( 'No custom template directory - using defaults' );
            vpf.set('views', __dirname + '/../public/templates');
        }

        // Set up the view engine
        // Only hogan is currently supported
        vpf.engine('hjs', cons.hogan);
        vpf.set('view engine', 'hjs');
    });
};

/**
 * Set the port number for the app
 * This is only used if it is not set by envionment variables (i.e. serving locally)
 * @param port
 */
vpf.setPort = function( port ) {
    vpf.configure( function() {
        vpf.set('port', process.env.PORT || port );
    });
};

/**
 * Sets up where the the static content is served from
 * Uses defaults if custom folder does not exist
 * @param customPath - the path to attempt to serve custom content from
 */
vpf.setStatic = function( customPath ) {
    var cwd = path.join( process.cwd(), customPath );

    vpf.configure( function() {
        try {
            fs.readdirSync( cwd );

            console.log( 'Custom directory found' );
            vpf.use(express.static( cwd ));
        }
        catch (err) {
            console.log( 'No custom directory found - using defaults' );
            vpf.use(express.static(path.join(__dirname, '/../public')));
        }
    });
};

/**
 * Sets the favicon for the app
 * Uses defaults if a viable favicon is not specified
 * @param favicon - the location to look for a custom favicon
 */
vpf.setFavicon = function( favicon ) {
    var cwf = path.join( process.cwd(), vpf.config.moduleOpts.customPath, favicon );

    vpf.configure( function() {
        try {
            fs.readFileSync( cwf );

            console.log( 'Custom favicon found' );
            vpf.use( express.favicon( cwf, { maxAge: 2592000000 } ) );
        }
        catch(err) {
            console.log( 'No custom favicon found - using default' );
            vpf.use(express.favicon(__dirname + '/../public/favicon.png', { maxAge: 2592000000 }));
        }
    });
};

/**
 * Sets the config for the app
 * Uses defaults if a custom folder or custom config does not exist
 * @param config - the location to look for a custom favicon
 */
vpf.setConfig = function( config ) {
    var cwf = path.join( process.cwd(), config );

    vpf.configure( function() {
        try {
            fs.readFileSync( cwf );

            console.log( 'Custom config found - setting config' );

            // Require the file to get the custom config goodies inside
            var configOpts = require( cwf );

            // Set config to equal the custom config options
            for ( var prop in configOpts) {
                vpf.config[ prop ] = configOpts[ prop ];
            }
        }
        catch(err) {
            console.log( 'No custom config found - using default' );
        }
    });
};