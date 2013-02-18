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
    },


    /**
     * getContent
     * gets the content from github
     * This should probably be moved to a core function
     * @param cb - the callback to fire on success
     */
    getContent: function( cb ) {
        // For now we know that the path will be a valid file but this function should differentiate between a file
        // and a directory and react accordingly (files get served or possibly returned after parsing with marked
        // whereas directories represent a category page and should display a list based on their associated json meta)
        vpf.util.github.repos.getContent( vpf.config.githubapi.contentOpts, function ( err, res ) {
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