'use strict';
/* jshint camelcase:false */
/* jshint forin:false */

/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var express     = require( 'express' ),
    cons        = require( 'consolidate' ),
    path        = require( 'path' ),
    fs          = require( 'fs' );

// Create viperfish core object
var vpf = module.exports = express();

/**
 * Core
 * --
 * Core functionality for viperfish
 * @type {Object}
 */
vpf.core = {

    /* -----------------------------------------------------------------------
     *
     *     Functions to create viperfish
     *
     * ----------------------------------------------------------------------- */

    /**
     * Sets up the view engine and templates
     */
    setTemplates: function() {
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
    },

    /**
     * Set the port number for the app
     * This is only used if it is not set by envionment variables (i.e. serving locally)
     * @param port
     */
    setPort: function( port ) {
        vpf.configure( function() {
            vpf.set('port', process.env.PORT || port );
        });
    },

    /**
     * Sets up where the the static content is served from
     * Uses defaults if custom folder does not exist
     * @param customPath - the path to attempt to serve custom content from
     */
    setStatic: function( customPath ) {
        var cwd = path.join( process.cwd(), customPath );

        vpf.configure( function() {
            try {
                fs.readdirSync( cwd );

                console.log( 'Custom directory found' );
                vpf.use(express.static( cwd , { max_Age: 60 * 60 * 24 * 90 } ));
            }
            catch (err) {
                console.log( 'No custom directory found - using defaults' );
                // Set caching of static files to roughly 3 months
                vpf.use(express.static(path.join(__dirname, '/../public'), { max_Age: 60 * 60 * 24 * 90 }));
            }
        });
    },

    /**
     * Sets the favicon for the app
     * Uses defaults if a viable favicon is not specified
     * @param favicon - the location to look for a custom favicon
     */
    setFavicon: function( favicon ) {
        var cwf = path.join( process.cwd(), vpf.config.moduleOpts.customPath, favicon );

        vpf.configure( function() {
            try {
                fs.readFileSync( cwf );

                console.log( 'Custom favicon found' );
                vpf.use( express.favicon( cwf, { maxAge: 60 * 60 * 24 * 90 } ) );
            }
            catch(err) {
                console.log( 'No custom favicon found - using default' );
                vpf.use(express.favicon(__dirname + '/../public/favicon.png', { maxAge: 60 * 60 * 24 * 90 }));
            }
        });
    },

    /**
     * Sets the config for the app
     * Uses defaults if a custom folder or custom config does not exist
     * @param config - the location to look for a custom config file
     */
    setConfig: function( config ) {
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
    },

    /**
     * Called after authentication with the Content Delivery Module succeeds
     */
    authSuccess: function() {
        console.log('Authentication with content delivery module successful' );
        // This function should set the auth verification and then grab the navigation which is all it needs
        // to do at the moment to initialise
        vpf.core.getNav();
    },

    /**
     * Called if authentication fails
     * Currently does nothing and Viperfish may blow up
     */
    authFailure: function() {
        console.log('Authentication failure' );
    },

    /* -----------------------------------------------------------------------
     *
     *     Core functionality
     *
     * ----------------------------------------------------------------------- */

    /**
     * authorise virtual function
     */
    authorise: function() {
        console.log( 'authorise() from the core -- this should be overridden by whichever content delivery mechanism has been installed' );
    },

    /**
     * getContent virtual function
     * @param path - the path to the content
     * @param callback (data) - callback function which is called when the content (data) is collected
     */
    getContent: function( path, callback ) {
        console.log( 'getContent() from the core -- should be overridden by content delivery mechanism');

        // To get around linting this virtual function
        path = 'Path to content';
        callback = 'The callback to to fire after collection - is passed data';
    },


    /**
     * getNav
     * Accesses github for the main.json, extracts nav data and sets it in the config
     */
    getNav: function () {

        var setNav = function ( data ) {
            // Quick check for no data
            if ( !data ) {
                console.error( 'No data received from accessing main.json on start - should be dealt with properly' );
                return;
            }

            // Decode the data
            var dataObj = JSON.parse( data );

            // Place the data into the config
            vpf.utils.config.setNav( dataObj );
        };

        // Get the content from main.json and assign the nav when its done
        vpf.core.getContent( 'main.json', setNav );
    }


};