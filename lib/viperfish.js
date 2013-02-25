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

    // Configure express server
    vpf.configure(function(){
        vpf.use(express.logger('dev'));
        vpf.use(express.bodyParser());
        vpf.use(express.methodOverride());

//        vpf.use(express.static(path.join(process.cwd(), '/public')));                               // Custom /public
//        vpf.use(express.static(path.join(__dirname, '/../public')));                                // Default /public
//        vpf.use(express.favicon(__dirname + '/../public/favicon.png', { maxAge: 2592000000 }));    // Default Viperfish favicon
//        vpf.use(vpf.router);
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

    // Get nav data and store it in the config
    vpf.core.getNav();

    // Set the templates - custom if they exist or default
    vpf.setTemplates( vpf.config.tmplOpts.engine );

    // Set up the port number - only used if not specified by process
    vpf.setPort( vpf.config.moduleOpts.port );

    // Set up static serving
    vpf.setStatic();

    // Set up favicon
    vpf.setFavicon();

    // Configure routes for viperfish after configuring static serving
    require( './vpf-router' );
};


vpf.setTemplates = function( tmpl ) {
    var cwd = process.cwd() + path.join(vpf.config.moduleOpts.customPath, 'templates' );

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


vpf.setPort = function( port ) {
    vpf.configure( function() {
        vpf.set('port', process.env.PORT || vpf.config.moduleOpts.port );
    });
};


vpf.setStatic = function() {
    var cwd = path.join( process.cwd(), vpf.config.moduleOpts.customPath );

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


vpf.setFavicon = function() {
    vpf.configure( function() {
        vpf.use(express.favicon(__dirname + '/../public/favicon.png', { maxAge: 2592000000 }));    // Default Viperfish favicon
    });
};