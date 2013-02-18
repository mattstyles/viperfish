/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var marked = require('marked'),
    github = require( '../githubapi/githubapi'),
    config = require( '../vpf-config');
    vpf    = require( '../viperfish' );


/**
 * Index route
 * @param req - the request passed via GET
 * @param res - the result of the GET call
 */
module.exports = function( req, res ) {

    // Function that fires on successful collection of content
    // Send the data back via a template
    // Use marked to parse the returned markdown file
    var display = function ( data ) {
        var decoded = null,
            path = config.tmplOpts.path;

        // Set up the options for marked
        marked.setOptions(config.markedOpts);

        if (data) {
            decoded = new Buffer(data, 'base64').toString('utf8');
            res.render( path + 'main', {
                title: 'Viperfish',
                //content: marked(decoded),
                content: JSON.parse(decoded),
                partials: {                     // No need for path here as it is relative to path + 'main'
                    header    : 'header',
                    footer    : 'footer',
                    nav       : 'nav',
                    listPost  : 'listPost'
                }
            });
        } else {
            res.render( path + 'index', { title: 'Error', content: 'Something went wrong' });
        }
    };


    // Add the path
    vpf.util.setPath( 'main.json' );

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.util.getContent( display );
};
