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
var vp = module.exports = require('./viperfish.js');

// Configure routes
vp.get('/', require('./routes/vpf-main.js'));