/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var vpf         = module.exports = require('./viperfish'),
    GithubApi   = require( 'github'),
    config      = require('./vpf-config');

/**
 * Utils
 * --
 * Various utility functions and classes for operating the main viperfish library
 * @type {Object}
 */
vpf.util = {

    // Set up githubapi
    github: new GithubApi( vpf.config.githubapi.apiOpts ),

    // --------------------------------------------------------------
    //
    //  Config Helpers
    //
    // --------------------------------------------------------------

    /**
     * setPath
     * sets the path for retrieving a file from github
     * @param path
     */
    setPath: function( path ) {
        vpf.config.githubapi.contentOpts.path = path;
    }

};