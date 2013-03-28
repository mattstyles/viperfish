/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var _  = require('underscore');
var vpf         = module.exports = require('./vpf-core');

/**
 * Init
 * --
 * Object that initialises and creates viperfish
 * @type {Object}
 */
vpf.init = {

    /* -----------------------------------------------------------------------
     *
     *     Set up and create the viperfish object
     *
     * ----------------------------------------------------------------------- */
    /**
     * init
     * adds the various parts of viperfish so it's ready to be properly created
     */
    init: function() {
        // Add the config to viperfish
        require( './vpf-config' );

        // Add utils to viperfish
        require( './vpf-utils' );

        // Add core functionality to viperfish
        require( './vpf-core' );

        // @todo add the required modules here - modules work by over-riding the functions declared with the require
        // @todo calls performed above
        _.extend( vpf.core, require( 'octofish' ) );

        // Call the create function to create viperfish now that all the functions have been added to vpf
        vpf.init.create();
    },


    /**
     * create
     * once the functions are defined by init() this function calls them all to create viperfish
     */
    create: function() {
        // Authorise with github
        //vpf.core.authGithub();
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
    }
};