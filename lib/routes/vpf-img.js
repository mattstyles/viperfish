/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var vpf    = require( '../viperfish' );


/**
 * Image route
 * --
 * Fetches the image data, decoded it into binary and returns the binary stream to be
 * displayed in the web page
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
        var decoded     = vpf.utils.decodeGithubImageData( data );

//        res.set( 'Content-Type', 'image/jpeg' );
        res.end( decoded, 'binary' );
    };

    // Add the path -  remove the first / and set the content path
    var url = req.originalUrl;
    url = url.slice(1, url.length);
    vpf.core.setContentPath( url );

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( present );
};