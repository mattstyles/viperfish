'use strict';
/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Router
 * --
 * Collection of routes for viperfish
 */

// Requires
var vpf = module.exports = require('./vpf-core');

// Configure routes
vpf.configure(function() {
    vpf.use(vpf.router);
});

vpf.get( '/', require( './routes/vpf-main' ) );
vpf.get( '/:category', require( './routes/vpf-category' ) );
vpf.get( '/:category/:post', require( './routes/vpf-post' ) );
vpf.get( '*/img/:path', require( './routes/vpf-img' ) );