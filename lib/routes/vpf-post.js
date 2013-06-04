'use strict';
/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

// Requires
var marked = require( 'marked' ),
    vpf    = require('../vpf-core');


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
        var path        = vpf.config.tmplOpts.path;

        // If data === null then the path did not return a valid value so 404
        console.log( '404 - getContent returned null' );
        if ( !data ) {
            res.render( path + 'error', {
                title       : 'Viperfish',
                nav         : vpf.config.moduleOpts.nav,
                logo        : vpf.config.moduleOpts.logo,
                content     : ' 404 - Request not found ',
                partials    : {
                    header    : 'header',
                    footer    : 'footer',
                    nav       : 'nav'
                }
            });

            return;
        }

        // Set options for marked
        marked.setOptions(vpf.config.markedOpts);

        res.render( path + 'post', {
            title       : 'Viperfish',
            nav         : vpf.config.moduleOpts.nav,
            logo        : vpf.config.moduleOpts.logo,
            content     : marked( data ),               // Use marked to parse data into html
            partials    : {
                header    : 'header',
                footer    : 'footer',
                nav       : 'nav'
            }
        });
    };

    // Add the path
    var path = req.param( 'category' ) + '/' + req.param( 'post' ) + '/content.md';

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( path, present );
};
