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
var vp = module.exports = require('./viperfish');

// Configure routes
vp.get('/', require('./routes/vpf-main'));
vp.get('/:category', require('./routes/vpf-category'));