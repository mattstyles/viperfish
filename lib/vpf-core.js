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
vpf.core = {

    // Set up githubapi
    github: new GithubApi( vpf.config.githubapi.apiOpts ),

    /**
     * setPath
     * sets the path for retrieving a file from github
     * @param path
     */
    setPath: function( path ) {
        vpf.config.githubapi.contentOpts.path = path;
    },

    /**
     * getContent
     * gets the content from github repo set up in config
     * @param cb - the callback to fire on success - passes in the collected data
     */
    getContent: function( cb ) {
        vpf.core.github.repos.getContent( vpf.config.githubapi.contentOpts, function ( err, res ) {
            // Handle any error
            if (err) {
                console.log( 'An error occured whilst getting content from github - this should be dealt with properly' );
                return;
            }

            // If the operation to get content from github was successful then call the callback with only the content
            // This file should actually handle what happens next but for now delegate to a callback
            cb( res.content );
        });
    }

};