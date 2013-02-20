/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var marked = require('marked'),
    vpf    = require( '../viperfish' );


/**
 * Index route
 * @param req - the request passed via GET
 * @param res - the result of the GET call
 */
module.exports = function( req, res ) {

    // Function that fires on successful collection of content
    var display = function ( data ) {
        // Check that some data has been returned from querying github
        if ( data ) {
            // Just return some junk for now - this can probably return a static 'github-collection-error' file rather
            // than go to the trouble of handling a template
            res.render( vpf.config.tmplOpts.path + 'index', { title: 'Error', content: 'Something went wrong' });
        }

        // If we got here then we're good to compile and present the template
        var decoded = vpf.utils.decodeGithubData( data ),
            path = vpf.config.tmplOpts.path;

        res.render( path + 'main', {
            title: 'Viperfish',
            content: JSON.parse( decoded ),
            partials: {                     // No need for path here as it is relative to path + 'main'
                header    : 'header',
                footer    : 'footer',
                nav       : 'nav',
                listPost  : 'listPost'
            }
        });
    };


    // Add the path
    vpf.core.setPath( 'main.json' );

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( display );
};
