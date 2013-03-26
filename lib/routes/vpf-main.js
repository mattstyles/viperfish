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
 * Index route
 * @param req
 * @param res
 */
module.exports = function( req, res ) {

    // Function that fires on successful collection of content
    var present = function ( data ) {
        var path        = vpf.config.tmplOpts.path,
            dataObj     = JSON.parse( data );

        res.render( path + 'main', {
            title       : 'Viperfish',
            nav         : dataObj.nav,
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
    vpf.core.setContentPath( 'main.json' );

    // Get the content and pass through a callback function that fires on successful collection of content
    vpf.core.getContent( present );
};
