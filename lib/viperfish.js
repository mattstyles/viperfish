/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Requires
 */
var vpf         = require('./vpf-core'),
    http        = require('http'),
    _           = require('underscore');

/**
 * Start
 * --
 * Configures the server and then starts it
 */
exports.start = function() {

    // Start server function
    var startServer = function() {
        // Create the server and start listening
        http.createServer(vpf).listen(vpf.get('port'), function(){
            console.log("Express server listening on port " + vpf.get('port'));
        });
    };

    // Init viperfish - must require vpf-init and then call init()
    require( './vpf-init' );
    vpf.init.init();

    // Start the server
    startServer();

};


/**
 * Require
 * --
 * Accepts a string or array and stores them so that init can include them later
 * @param item - string or array which represents a file or module
 */
exports.require = function( item ) {
    vpf.modules = _.union( vpf.modules, item );
};



