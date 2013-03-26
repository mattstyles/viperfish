/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var vpf         = module.exports = require( './viperfish' ),
    express     = require( 'express' ),
    cons        = require( 'consolidate' ),
    path        = require( 'path' ),
    fs          = require( 'fs' );

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
    }

};