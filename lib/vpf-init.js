/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var vpf         = module.exports = require('./vpf-core'),
    express     = require('express'),
    _           = require('underscore');

/**
 * Init
 * --
 * Object that initialises and creates viperfish
 * @type {Object}
 */
module.exports = (function() {

    /**
     * init function
     * once the functions are defined this function calls them all to create viperfish
     */
    var init = function() {
        // Authorise with github
        vpf.core.authorise();

        // Set the config first
        vpf.core.setConfig( 'config.js' );

        // Get nav data and store it in the config
        vpf.core.getNav();

        // Set the templates - custom if they exist or default
        vpf.core.setTemplates();

        // Set up the port number - only used if not specified by process
        vpf.core.setPort( vpf.config.moduleOpts.port );

        // Set up static serving
        vpf.core.setStatic( vpf.config.moduleOpts.customPath );

        // Set up favicon
        vpf.core.setFavicon( vpf.config.moduleOpts.favicon );

        // Configure routes for viperfish after configuring static serving
        require( './vpf-router' );
    };

    /* -----------------------------------------------------------------------
     *
     *     Set up and then initialise the viperfish object
     *
     * ----------------------------------------------------------------------- */
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

    // Add the config to viperfish
    require( './vpf-config' );

    // Add utils to viperfish
    require( './vpf-utils' );

    // Add core functionality to viperfish
    require( './vpf-core' );

    // Add modules that were required before starting viperfish
    // For each module add it to the core - this makes the order in which they are required important
    _.each( vpf.modules, function( module ) {
        _.extend( vpf.core, require( module ) );
    });

    // Call the create function to create viperfish now that all the functions have been added to vpf
    init();

})();