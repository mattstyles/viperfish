/*
 * viperfish
 * https://github.com/mattstyles/viperfish
 *
 * Copyright (c) 2013 Matt Styles
 * Licensed under the MIT license.
 */

/**
 * Utils
 * --
 * Various utility functions and classes for operating the main viperfish library
 */

// Requires
var config = require('./vpf-config');


// The Utility Object
var utils = module.exports;


/**
 * Config Utilities
 * --
 * This object keeps the config data private and exposes an interface of public functions for dealing with it
 */
utils.config = module.exports;

utils.config.setDataPath = function( path ) {
    config.githubapi.contentOpts.path = path;
};

utils.config.getData = function() {
    return config.githubapi.contentOpts;
};