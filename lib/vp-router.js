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
var app = module.exports = require('../app');
var vp = require('./viperfish.js');


// Configure routes
app.get('/', vp.index);