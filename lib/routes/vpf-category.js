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
 * Category route
 * --
 * Fetches the category json file associated with the category being navigated to
 * @param req
 * @param res
 */

module.exports = function( req, res ) {

    // Function that fires on successful collection of content
    var present = function ( data ) {
        var path        = vpf.config.tmplOpts.path,
            dataObj     = JSON.parse( data );

        // If data === null then the path did not return a valid value so 404
        console.log( '404 - getContent returned null' );
        if ( !dataObj ) {
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


        res.render( path + 'main', {
            title       : 'Viperfish',
            nav         : vpf.config.moduleOpts.nav,
            logo        : vpf.config.moduleOpts.logo,
            recents     : dataObj.recent,
            partials    : {
                header    : 'header',
                footer    : 'footer',
                nav       : 'nav',
                listPost  : 'listPost'
            }
        });
    };


    // Add the path
    var path = req.param( 'category' ) + '/category.json';

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( path, present );
};