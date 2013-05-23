/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var vpf    = require('../vpf-core');


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
        // Error check for invalid response from collecting data
        if ( !data ) {
            console.log( 'Error collecting image data' );
            return;
        }

        // Simply send the request through as a binary
//        res.set( 'Content-Type', 'image/jpeg' );
        res.end( data, 'binary' );
    };

    // Add the path -  remove the first /
    var path = req.originalUrl;
    path = path.slice(1, path.length);

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( path, present );
};