/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var marked = require( 'marked' ),
    vpf    = require( '../viperfish' );


/**
 * Post route
 * --
 * Fetches the markdown, parses it and places it into the template for presentation
 * For now ignores page metadata
 * @param req
 * @param res
 */

module.exports = function( req, res ) {

    // Function that fires on successful collection of content
    var present = function ( data ) {
        // Check that some data has been returned from querying github
        // @todo lack of data is handled by getContent which won't call the callback if an error occurred
        if ( !data ) {
            // Just return some junk for now - this can probably return a static 'github-collection-error' file rather
            // than go to the trouble of handling a template
            res.render( vpf.config.tmplOpts.path + 'error', { title: 'Error', content: 'Something went wrong' });
        }

        // If we got here then we're good to compile and present the template
        var decoded     = vpf.utils.decodeGithubData( data ),
            path        = vpf.config.tmplOpts.path,
            content     = null;

        // Set options for marked
        marked.setOptions(vpf.config.markedOpts);

        // Use marked to parse markdown content into html
        content = marked( decoded );

        res.render( path + 'post', {
            title       : 'Viperfish',
            nav         : vpf.config.moduleOpts.nav,
            logo        : vpf.config.moduleOpts.logo,
            content     : content,
            partials    : {                     // No need for path here as it is relative to path + 'post'
                header    : 'header',
                footer    : 'footer',
                nav       : 'nav'
            }
        });
    };

    // Add the path
    vpf.core.setContentPath( req.param( 'category' ) + '/' + req.param( 'post' ) + '/content.md' );

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( present );
};
