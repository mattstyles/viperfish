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
var vpf = require( './viperfish' );


/**
 * Core
 * --
 * Various utility functions and classes for operating the main viperfish library
 * @type {Object}
 */
vpf.utils = {

    /**
     * decodes the data returned from a github api query
     * @param data - base64 encoded response from querying github for content
     * @returns buffer containing a string representation of the base64 encoded query data
     */
    decodeGithubData: function( data ) {
        return new Buffer(data, 'base64').toString('utf8');
    }

};